import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDomainDto, UpdateDomainDto, FindAllDomainsDto } from './dto/domain.dto';

@Injectable()
export class DomainService {
  constructor(private prisma: PrismaService) {}

  async create(createDomainDto: CreateDomainDto) {
    const { tags, ...domainData } = createDomainDto;

    return this.prisma.domain.create({
      data: {
        ...domainData,
        tags: {
          connect: tags.map(tagId => ({ id: tagId })),
        },
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        tags: true,
      },
    });
  }

  async findAll(query: FindAllDomainsDto) {
    const { skip, take, search, active, stipend, companyId, tag } = query;

    const where = {
      ...(active !== undefined && { active }),
      ...(stipend !== undefined && { stipend }),
      ...(companyId && { companyId }),
      ...(tag && {
        tags: {
          some: {
            id: tag,
          },
        },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { requirements: { contains: search, mode: 'insensitive' } },
          { company: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [domains, total] = await Promise.all([
      this.prisma.domain.findMany({
        where,
        skip,
        take,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
          tags: true,
          _count: {
            select: {
              bookmarks: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.domain.count({ where }),
    ]);

    return {
      domains,
      meta: {
        total,
        skip,
        take,
      },
    };
  }

  async findOne(id: string) {
    const domain = await this.prisma.domain.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            description: true,
            website: true,
            email: true,
            address: true,
            city: true,
            state: true,
            country: true,
          },
        },
        tags: true,
        _count: {
          select: {
            bookmarks: true,
          },
        },
      },
    });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return domain;
  }

  async update(id: string, updateDomainDto: UpdateDomainDto) {
    const { tags, ...domainData } = updateDomainDto;

    const domain = await this.prisma.domain.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return this.prisma.domain.update({
      where: { id },
      data: {
        ...domainData,
        ...(tags && {
          tags: {
            set: [], // First remove all existing tags
            connect: tags.map(tagId => ({ id: tagId })), // Then connect new tags
          },
        }),
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
        tags: true,
      },
    });
  }

  async delete(id: string) {
    const domain = await this.prisma.domain.findUnique({ where: { id } });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return this.prisma.domain.delete({ 
      where: { id },
      include: {
        tags: true,
      },
    });
  }
}