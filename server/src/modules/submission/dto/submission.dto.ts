import { IsString, IsEnum, IsOptional, ValidateNested, IsArray, IsBoolean, IsNumber, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export enum SubmissionType {
  NEW_COMPANY = 'NEW_COMPANY',
  UPDATE_COMPANY = 'UPDATE_COMPANY',
  NEW_DOMAIN = 'NEW_DOMAIN',
  UPDATE_DOMAIN = 'UPDATE_DOMAIN'
}

export enum SubmissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

// Base Company DTO for submissions
export class CompanySubmissionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  companyPhotos?: string[];

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  industryType?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStacks?: string[];
}

// Domain submission DTO
export class DomainSubmissionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  requirements?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  perks?: string[];

  @IsBoolean()
  @IsOptional()
  stipend?: boolean;

  @IsNumber()
  @IsOptional()
  stipendAmount?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}

// Create submission DTO
export class CreateSubmissionDto {
  @IsEnum(SubmissionType)
  type: SubmissionType;

  @IsString()
  @IsOptional()
  companyId?: string;

  @IsObject()
  @ValidateNested()
  @Type((opts) => {
    if (opts?.object?.type === SubmissionType.NEW_COMPANY || opts?.object?.type === SubmissionType.UPDATE_COMPANY) {
      return CompanySubmissionDto;
    }
    return DomainSubmissionDto;
  })
  data: CompanySubmissionDto | DomainSubmissionDto;
}

// Update submission status DTO
export class UpdateSubmissionStatusDto {
  @IsString()
  adminFeedback: string;
}

// Query submissions DTO
export class QuerySubmissionDto {
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;

  @IsEnum(SubmissionType)
  @IsOptional()
  type?: SubmissionType;

  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;
}

// Response DTO
export class SubmissionResponseDto {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  data: any;
  userId: string;
  companyId?: string;
  adminFeedback?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    email: string;
    fullName: string;
  };
}