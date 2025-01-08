import { IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  domainId: string;
}

export class BookmarkResponseDto {
  id: string;
  userId: string;
  domainId: string;
  createdAt: Date;
  domain?: {
    id: string;
    name: string;
    description?: string;
    company?: {
      id: string;
      name: string;
    }
  };
}