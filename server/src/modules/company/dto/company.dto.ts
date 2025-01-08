import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsString, IsOptional, IsArray, IsUrl, IsEmail, IsPhoneNumber, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { PageOptionsDto } from 'src/modules/common/dto/page-options.dto';

export enum CompanyOrderBy {
  RATING = 'rating',
  REVIEWS = 'reviews',
  CREATED_AT = 'createdAt'
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
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  industryType?: string[];

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  verified?: boolean;

  @IsOptional()
  @IsEnum(CompanyOrderBy)
  orderBy?: CompanyOrderBy = CompanyOrderBy.CREATED_AT;
}

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

  @IsArray()
  @IsString({ each: true })
  industryType: string[];

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