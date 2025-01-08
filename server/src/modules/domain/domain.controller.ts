import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { DomainService } from './domain.service';
import { CreateDomainDto, UpdateDomainDto, FindAllDomainsDto } from './dto/domain.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('domains')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto);
  }

  @Get()
  findAll(@Query() query: FindAllDomainsDto) {
    return this.domainService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.update(id, updateDomainDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.domainService.delete(id);
  }
}