// ContentTypeDTO.ts
import {
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentIdDTO } from 'src/content/content.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusTrackIdDTO } from '../status-tracker/dto/create-status-contentype.dto';

export class ContentTypeDTO {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => ContentIdDTO)
  contents: ContentIdDTO[];

  @Type(() => StatusTrackIdDTO)
  statusTracker: StatusTrackIdDTO;

  statusTrackerId: number;
}

export class CreateContentTypeDTO extends ContentTypeDTO {
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(0)
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(10)
  description: string;

  @ApiProperty({ required: false })
  @ValidateNested({ each: true })
  @Type(() => ContentIdDTO)
  contents: ContentIdDTO[];

  @ApiProperty({ required: true })
  @Type(() => StatusTrackIdDTO)
  statusTracker: StatusTrackIdDTO;

  statusTrackerId: number;
}

export class UpdateContentTypeDTO extends PartialType(ContentTypeDTO) {}