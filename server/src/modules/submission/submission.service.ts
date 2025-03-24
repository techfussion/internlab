import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateSubmissionDto,
  QuerySubmissionDto,
  SubmissionResponseDto,
  UpdateSubmissionStatusDto,
  SubmissionType,
  SubmissionStatus,
} from './dto/submission.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    const { type, data, companyId } = createSubmissionDto;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!companyId) {
      throw new BadRequestException('Company ID is required');
    }

    const submission = await this.prisma.submission.create({
      data: {
        type,
        data: data as unknown as Prisma.InputJsonValue,
        status: SubmissionStatus.PENDING,
        userId, 
        companyId, 
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return this.mapToResponseDto(submission);
  }

  async findAll(params: QuerySubmissionDto): Promise<SubmissionResponseDto[]> {
    const { skip, take, status, type } = params;

    const submissions = await this.prisma.submission.findMany({
      skip,
      take,
      where: {
        status,
        type,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return submissions.map(this.mapToResponseDto);
  }

  async findOne(id: string): Promise<SubmissionResponseDto> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!submission) {
      throw new NotFoundException(`Submission #${id} not found`);
    }

    return this.mapToResponseDto(submission);
  }

  async approve(
    id: string,
    updateStatusDto: UpdateSubmissionStatusDto,
  ): Promise<SubmissionResponseDto> {
    const submission = await this.findOne(id);

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // Update submission status
        const updatedSubmission = await tx.submission.update({
          where: { id },
          data: {
            status: SubmissionStatus.APPROVED,
            adminFeedback: updateStatusDto.adminFeedback,
          },
          include: {
            user: {
              select: {
                id: true,
                email: true,
                fullName: true,
              },
            },
          },
        });

        // Apply the changes based on submission type
        switch (submission.type) {
          case SubmissionType.NEW_COMPANY:
            await tx.company.create({
              data: submission.data,
            });
            break;

          case SubmissionType.UPDATE_COMPANY:
            await tx.company.update({
              where: { id: submission.companyId },
              data: submission.data,
            });
            break;

          case SubmissionType.NEW_DOMAIN:
            await tx.domain.create({
              data: {
                ...submission.data,
                companyId: submission.companyId,
              },
            });
            break;

          case SubmissionType.UPDATE_DOMAIN:
            await tx.domain.update({
              where: { id: submission.data.domainId },
              data: submission.data,
            });
            break;
        }

        return updatedSubmission;
      });

      return this.mapToResponseDto(result);
    } catch (error) {
      throw new BadRequestException(
        'Failed to apply submission changes: ' + error.message,
      );
    }
  }

  async reject(
    id: string,
    updateStatusDto: UpdateSubmissionStatusDto,
  ): Promise<SubmissionResponseDto> {
    const updatedSubmission = await this.prisma.submission.update({
      where: { id },
      data: {
        status: SubmissionStatus.REJECTED,
        adminFeedback: updateStatusDto.adminFeedback,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    return this.mapToResponseDto(updatedSubmission);
  }

  private mapToResponseDto(submission: any): SubmissionResponseDto {
    return {
      id: submission.id,
      type: submission.type,
      status: submission.status,
      data: submission.data,
      userId: submission.userId,
      companyId: submission.companyId,
      adminFeedback: submission.adminFeedback,
      createdAt: submission.createdAt,
      updatedAt: submission.updatedAt,
      user: submission.user,
    };
  }
}
