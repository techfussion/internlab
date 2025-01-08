import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto, FindAllReviewsDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    // Check if user has already reviewed this company
    const existingReview = await this.prisma.review.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId: createReviewDto.companyId,
        },
      },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this company');
    }

    // Create the review
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            institution: true,
          },
        },
      },
    });

    // Update company rating statistics
    await this.updateCompanyRatingStats(createReviewDto.companyId);

    return review;
  }

  async findAll(query: FindAllReviewsDto) {
    const { skip, take, companyId, userId, verified } = query;

    const where = {
      ...(companyId && { companyId }),
      ...(userId && { userId }),
      ...(verified !== undefined && { verified }),
    };

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              institution: true,
            },
          },
        },
      }),
      this.prisma.review.count({ where }),
    ]);

    return {
      reviews,
      meta: {
        total,
        skip,
        take,
      },
    };
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            institution: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    if (review.userId !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            institution: true,
          },
        },
      },
    });

    // Update company rating statistics if rating changed
    if (updateReviewDto.rating) {
      await this.updateCompanyRatingStats(review.companyId);
    }

    return updatedReview;
  }

  async delete(id: string, userId: string, userRole: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    if (review.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    const deletedReview = await this.prisma.review.delete({
      where: { id },
    });

    // Update company rating statistics
    await this.updateCompanyRatingStats(review.companyId);

    return deletedReview;
  }

  async verifyReview(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return this.prisma.review.update({
      where: { id },
      data: { verified: true },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            institution: true,
          },
        },
      },
    });
  }

  private async updateCompanyRatingStats(companyId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { companyId },
      select: { rating: true },
    });

    const totalReviews = reviews.length;
    const avgRating: number | null = totalReviews > 0
      ? reviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) / totalReviews
      : null;

    await this.prisma.company.update({
      where: { id: companyId },
      data: {
        avgRating,
        totalReviews,
      },
    });
  }
}