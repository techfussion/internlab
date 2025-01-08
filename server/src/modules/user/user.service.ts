import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto, FindAllUsersDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

//   async create(createUserDto: CreateUserDto) {
//     const existingUser = await this.prisma.user.findUnique({
//       where: { email: createUserDto.email },
//     });

//     if (existingUser) {
//       throw new ConflictException('Email already exists');
//     }

//     const hashedPassword = await hash(createUserDto.password, 10);

//     return this.prisma.user.create({
//       data: {
//         ...createUserDto,
//         password: hashedPassword,
//       },
//     });
//   }

  async findAll(query: FindAllUsersDto) {
    const { skip, take, search } = query;
    
    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { fullName: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { institution: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { department: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          email: true,
          fullName: true,
          institution: true,
          department: true,
          level: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              reviews: true,
              submissions: true,
              bookmarks: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      meta: {
        total,
        skip,
        take,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            reviews: true,
            submissions: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({ where: { id } });
  }
}