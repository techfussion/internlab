import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';
import { DomainModule } from './modules/domain/domain.module';
import { ReviewModule } from './modules/review/review.module';
import { TagModule } from './modules/tag/tag.module';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, UserModule, CompanyModule, DomainModule, ReviewModule, TagModule, SubmissionModule],
})
export class AppModule {}
 