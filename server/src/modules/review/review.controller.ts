import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto, FindAllReviewsDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.sub;
    return this.reviewService.create(createReviewDto, userId);
  }

  @Get()
  findAll(@Query() query: FindAllReviewsDto) {
    return this.reviewService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.sub;
    return this.reviewService.update(id, updateReviewDto, userId);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    const { sub: userId, role: userRole } = user;
    return this.reviewService.delete(id, userId, userRole);
  }

  @Patch(':id/verify')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  verifyReview(@Param('id') id: string) {
    return this.reviewService.verifyReview(id);
  }
}
