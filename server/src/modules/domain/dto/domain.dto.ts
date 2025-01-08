import { IsString, IsOptional, IsBoolean, IsArray, IsInt, Min, IsDecimal, IsUUID } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDomainDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsArray()
  @IsString({ each: true })
  perks: string[];

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  stipend: boolean = false;

  @IsOptional()
  @IsDecimal()
  stipendAmount?: number;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active: boolean = true;

  @IsString()
  @IsUUID()
  companyId: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}

export class UpdateDomainDto extends PartialType(CreateDomainDto) {}

export class FindAllDomainsDto {
    @IsOptional()
    @IsString()
    search?: string;
  
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    active?: boolean;
  
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    stipend?: boolean;
  
    @IsOptional()
    @IsString()
    companyId?: string;
  
    @IsOptional()
    @IsString()
    tag?: string;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    skip?: number = 0;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    take?: number = 10;
  }
  