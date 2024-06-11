import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto, UpdateCollectionDto } from './collection.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Pagination and Content Update')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiCookieAuth('accessToken')
  @Post('page')
  @UseGuards(AuthGuard)
  createUserWithContent(@Request() req, @Body() data: CreateCollectionDto) {
    return this.collectionService.createUserWithContent(req.user, data);
  }

  @UseGuards(AuthGuard)
  @Get('')
  @ApiCookieAuth('accessToken')
  getUserWithContent(@Request() req) {
    return this.collectionService.getCollectionByUser(req.user);
  }

  @ApiCookieAuth('accessToken')
  @Patch('page')
  @UseGuards(AuthGuard)
  updateUserPaginationWithContent(
    @Request() req,
    @Body() data: UpdateCollectionDto,
  ) {
    return this.collectionService.updateCollectionContentAndUser(
      req.user,
      data,
    );
  }
  @ApiCookieAuth('accessToken')
  @Get('search')
  @UseGuards(AuthGuard)
  searchCollectionByUser(@Query('q') query, @Request() req) {
    return this.collectionService.searchInsideCollectionByContentName(
      query,
      req.user,
    );
  }
}
