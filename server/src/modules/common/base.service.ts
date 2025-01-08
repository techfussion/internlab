// base.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BaseService {
  constructor(protected readonly prisma: PrismaService) {}

  protected async handleError(error: any): Promise<never> {
    if (error.code === 'P2002') {
      throw new Error('Unique constraint violation');
    }
    if (error.code === 'P2025') {
      throw new Error('Record not found');
    }
    throw error;
  }
}