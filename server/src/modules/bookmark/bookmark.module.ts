import { Module } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";

@Module({
    controllers: [BookmarkModule],
    providers: [BookmarkService],
})

export class BookmarkModule {}