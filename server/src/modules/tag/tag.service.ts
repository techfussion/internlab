import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto, UpdateTagDto, FindAllTagsDto } from './dto/tag.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { name: createTagDto.name },
    });

    if (existingTag) {
      throw new ConflictException('Tag with this name already exists');
    }

    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  async findAll(query: FindAllTagsDto) {
    const { skip, take, search } = query;

    const where: Prisma.TagWhereInput = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({
        where,
        skip,
        take,
        orderBy: {
          count: 'desc', // Order by popularity
        },
      }),
      this.prisma.tag.count({ where }),
    ]);

    return {
      tags,
      meta: {
        total,
        skip,
        take,
      },
    };
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            domains: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    if (updateTagDto.name && updateTagDto.name !== tag.name) {
      const existingTag = await this.prisma.tag.findUnique({
        where: { name: updateTagDto.name },
      });

      if (existingTag) {
        throw new ConflictException('Tag with this name already exists');
      }
    }

    return this.prisma.tag.update({
      where: { id },
      data: updateTagDto,
    });
  }

  async delete(id: string) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.prisma.tag.delete({ where: { id } });
  }
}