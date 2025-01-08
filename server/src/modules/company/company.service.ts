import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto, UpdateCompanyDto, FindAllCompaniesDto, CompanyOrderBy } from './dto/company.dto';
import { PageDto } from '../common/dto/page.dto';
import { Order } from '../common/dto/page-options.dto';
import { PageMetaDto } from '../common/dto/page-meta.dto';

@Injectable()
export class CompanyService extends BaseService {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(data: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data,
        include: {
          domains: true,
          reviews: {
            include: {
              user: {
                select: {
                  fullName: true,
                  institution: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw await this.handleError(error);
    }
  }

  async findAll(dto: FindAllCompaniesDto): Promise<PageDto<any>> {
    const where = this.buildWhereClause(dto);
    const orderBy = this.buildOrderByClause(dto);

    const [companies, itemCount] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip: dto.skip,
        take: dto.take,
        orderBy,
        include: {
          domains: {
            select: {
              id: true,
              name: true,
              active: true,
            }
          },
          _count: {
            select: {
              reviews: true,
              domains: true,
            },
          },
        },
      }),
      this.prisma.company.count({ where }),
    ]);

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: dto,
      itemCount,
    });

    return new PageDto(companies, pageMetaDto);
  }

  private buildWhereClause(dto: FindAllCompaniesDto) {
    const where: any = {};

    if (dto.search) {
      where.OR = [
        { name: { contains: dto.search, mode: 'insensitive' } },
        { description: { contains: dto.search, mode: 'insensitive' } },
      ];
    }

    if (dto.city) {
      where.city = { equals: dto.city, mode: 'insensitive' };
    }

    if (dto.state) {
      where.state = { equals: dto.state, mode: 'insensitive' };
    }

    if (dto.industryType?.length) {
      where.industryType = { hasAny: dto.industryType };
    }

    if (dto.verified !== undefined) {
      where.verified = dto.verified;
    }

    return where;
  }

  private buildOrderByClause(dto: FindAllCompaniesDto) {
    const direction = dto.order === Order.ASC ? 'asc' : 'desc';

    switch (dto.orderBy) {
      case CompanyOrderBy.RATING:
        return { avgRating: direction };
      case CompanyOrderBy.REVIEWS:
        return { totalReviews: direction };
      case CompanyOrderBy.CREATED_AT:
      default:
        return { createdAt: direction };
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.prisma.company.findUniqueOrThrow({
        where: { id },
        include: {
          domains: {
            include: {
              tags: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  fullName: true,
                  institution: true,
                },
              },
            },
          },
          _count: {
            select: {
              reviews: true,
              domains: true,
            },
          },
        },
      });
      return company;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }
      throw await this.handleError(error);
    }
  }

  async update(id: string, data: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data,
        include: {
          domains: true,
          reviews: {
            include: {
              user: {
                select: {
                  fullName: true,
                  institution: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw await this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const company = await this.prisma.company.findUnique({ where: { id } });
      if (!company) throw new NotFoundException(`Company with ID ${id} not found`);

      await this.prisma.company.delete({ where: { id } });
      return { success: true, message: 'Company deleted successfully' };
    } catch (error) {
      throw await this.handleError(error);
    }
  }

  async updateAverageRating(companyId: string) {
    try {
      // Ensure the company exists
      const companyExists = await this.prisma.company.findUnique({ where: { id: companyId } });
      if (!companyExists) throw new NotFoundException(`Company with ID ${companyId} not found`);

      const reviews = await this.prisma.review.findMany({ where: { companyId } });

      const avgRating = reviews.length
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : null;

      await this.prisma.$transaction([
        this.prisma.company.update({
          where: { id: companyId },
          data: {
            avgRating,
            totalReviews: reviews.length,
          },
        }),
      ]);
    } catch (error) {
      throw await this.handleError(error);
    }
  }
}
