import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PageOptionsDto } from 'src/modules/common/dto/page-options.dto';
import { Prisma } from '@prisma/client';

export enum CompanyOrderBy {
  RATING = 'avgRating',
  REVIEWS = 'totalReviews',
  CREATED_AT = 'createdAt',
}

export class FindAllCompaniesDto extends PageOptionsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  industryType?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  verified?: boolean;

  @IsOptional()
  @IsEnum(CompanyOrderBy)
  orderBy?: CompanyOrderBy = CompanyOrderBy.CREATED_AT;

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  orderType?: Prisma.SortOrder = 'desc';
}

// Rest of the DTOs remain unchanged
export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  companyPhotos?: string[];

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  x?: string;

  @IsOptional()
  @IsUrl()
  linkedIn?: string;

  @IsOptional()
  @IsUrl()
  instagram?: string;

  @IsOptional()
  @IsUrl()
  facebook?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  otherOfficeLocations?: string[];


  @IsString({ each: true })
  industryType: string;

  @IsOptional()
  @IsString()
  companySize?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  established?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  techStacks?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  perks?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  team?: string[];

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
