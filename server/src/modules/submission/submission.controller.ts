import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { CurrentUser } from '../auth/decorators/current-user.decorator';
  import { SubmissionService } from './submission.service';
  import {
    CreateSubmissionDto,
    QuerySubmissionDto,
    UpdateSubmissionStatusDto,
    SubmissionResponseDto,
  } from './dto/submission.dto';
  import { Role } from '../auth/enums/role.enum';
  
  @Controller('submissions')
  @UseGuards(JwtAuthGuard)
  export class SubmissionController {
    constructor(private readonly submissionService: SubmissionService) {}
  
    @Post()
    async create(
      @CurrentUser() user: any,
      @Body() createSubmissionDto: CreateSubmissionDto,
    ): Promise<SubmissionResponseDto> {
      return this.submissionService.create(user.id, createSubmissionDto);
    }
  
    @Get()
    @UseGuards(RolesGuard)
    // @Roles(Role.ADMIN)
    async findAll(@Query() query: QuerySubmissionDto): Promise<SubmissionResponseDto[]> {
      return this.submissionService.findAll(query);
    }
  
    @Get(':id')
    async findOne(
      @Param('id') id: string,
      @CurrentUser() user: any,
    ): Promise<SubmissionResponseDto> {
      const submission = await this.submissionService.findOne(id);
      
      if (user.role !== Role.ADMIN && submission.userId !== user.id) {
        throw new BadRequestException('You do not have permission to view this submission');
      }
      
      return submission;
    }
  
    @Post(':id/approve')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async approve(
      @Param('id') id: string,
      @Body() updateStatusDto: UpdateSubmissionStatusDto,
    ): Promise<SubmissionResponseDto> {
      return this.submissionService.approve(id, updateStatusDto);
    }
  
    @Post(':id/reject')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async reject(
      @Param('id') id: string,
      @Body() updateStatusDto: UpdateSubmissionStatusDto,
    ): Promise<SubmissionResponseDto> {
      return this.submissionService.reject(id, updateStatusDto);
    }
  }