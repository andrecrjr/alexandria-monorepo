// ContentDTO.ts
import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CollectionDTO } from 'src/collection/collection';
import { PartialContentTypeDTO } from 'src/contenttype/contenttype';
import { ApiProperty } from '@nestjs/swagger';
import { AuthorSwaggerDTO } from 'src/author-content/entities/author-content.entity';
import { PartialType } from '@nestjs/mapped-types';

export class ContentDTO {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description:
      'The unique identifier for the content, automatically generated.',
  })
  id: number;

  @IsString()
  @ApiProperty({ description: 'The title of the content.' })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'A detailed description of the content.',
    required: false,
  })
  description?: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'The identifier for the associated content type.',
    required: false,
  })
  typeId: number;

  @IsInt()
  @ApiProperty({ description: 'The total number of pages in the content.' })
  numberPages: number;

  @IsOptional()
  @ApiProperty({
    description: "The URL of the content's cover image.",
    required: false,
  })
  imageUrl?: string;

  @IsOptional()
  @ApiProperty({
    description: `The content type's track for this Content`,
  })
  @ValidateNested({ each: true })
  @Type(() => PartialContentTypeDTO)
  type: PartialContentTypeDTO;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The International Standard Book Number (ISBN).',
    required: false,
  })
  isbn?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: 'The identifier of the user who created the content.',
    required: false,
  })
  createdById?: number;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The date and time when the content was created.',
    required: false,
  })
  createdAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    description: 'The date and time when the content was last updated.',
    required: false,
  })
  updatedAt: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CollectionDTO)
  @ApiProperty({
    description: 'The collections to which the content is associated.',
    type: [CollectionDTO],
    required: false,
  })
  collections: CollectionDTO[];

  @IsOptional()
  @ApiProperty({
    description: 'The authors of the content.',
    type: [AuthorSwaggerDTO],
    required: false,
  })
  @Type(() => AuthorSwaggerDTO)
  authors?: AuthorSwaggerDTO[];
}

// The CollectionDTO and AuthorSwaggerDTO classes should be defined elsewhere in your code.

export class CreateContentDTO extends ContentDTO {
  @IsString()
  @ApiProperty({
    description: 'The International Standard Book Number (ISBN).',
    required: true,
  })
  isbn: string;
}

export class UpdateContentDTO extends PartialType(ContentDTO) {
  @ApiProperty({ description: 'The title of the content.', required: false })
  title?: string;

  @ApiProperty({
    description: 'A detailed description of the content.',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The identifier for the associated content type.',
    required: false,
  })
  typeId?: number;

  @ApiProperty({
    description: 'The total number of pages in the content.',
    required: false,
  })
  numberPages?: number;

  @ApiProperty({
    description: "The URL of the content's cover image.",
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'The International Standard Book Number (ISBN).',
    required: false,
  })
  isbn?: string;

  @ApiProperty({
    description: 'The identifier of the user who created the content.',
    required: false,
  })
  createdById?: number;

  @ApiProperty({
    description: 'The date and time when the content was created.',
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'The date and time when the content was last updated.',
    required: false,
  })
  updatedAt?: Date;
}
