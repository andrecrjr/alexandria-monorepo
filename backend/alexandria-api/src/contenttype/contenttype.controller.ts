import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ContenttypeService } from './contenttype.service';
import { ContentTypeDTO } from './contenttype';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('contenttype')
@ApiTags('Content Types for Content')
export class ContenttypeController {
  constructor(private readonly contentTypeService: ContenttypeService) {}
  @ApiBearerAuth('defaultBearerAuth')
  @Post()
  @UseGuards(AuthGuard)
  createType(@Body() data: ContentTypeDTO) {
    return this.contentTypeService.createContentType(data);
  }

  @Get()
  get() {
    return this.contentTypeService.getAll();
  }
}
