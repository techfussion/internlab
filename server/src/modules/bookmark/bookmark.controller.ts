import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/bookmark.dto';

@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  create(
    @CurrentUser() user: any,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    // console.log('Authenticated User:', user);
    return this.bookmarkService.create(user.sub, createBookmarkDto);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.bookmarkService.findAll(user.sub);
  }

  @Delete(':domainId')
  remove(@CurrentUser() user: any, @Param('domainId') domainId: string) {
    return this.bookmarkService.remove(user.sub, domainId);
  }
}
