import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, BookmarkResponseDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    try {
      const bookmark = await this.prisma.bookmark.create({
        data: {
          user: {
            connect: { id: userId },
          },
          domain: {
            connect: { id: createBookmarkDto.domainId },
          },
        },
        include: {
          domain: {
            select: {
              id: true,
              name: true,
              description: true,
              company: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return this.mapToResponseDto(bookmark);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Domain already bookmarked');
      }
      throw error;
    }
  }

  async findAll(userId: string): Promise<BookmarkResponseDto[]> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId },
      include: {
        domain: {
          select: {
            id: true,
            name: true,
            description: true,
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return bookmarks.map(this.mapToResponseDto);
  }

  async remove(userId: string, domainId: string): Promise<void> {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { userId, domainId },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    await this.prisma.bookmark.delete({
      where: { id: bookmark.id },
    });
  }

  private mapToResponseDto(bookmark: any): BookmarkResponseDto {
    return {
      id: bookmark.id,
      userId: bookmark.userId,
      domainId: bookmark.domainId,
      createdAt: bookmark.createdAt,
      domain: bookmark.domain,
    };
  }
}
