import { PartialType } from '@nestjs/swagger';
import { CreateSeriesContentDto } from './create-series-content.dto';
import { ContentIdDTO } from 'src/content/content.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSeriesContentDto extends PartialType(
  CreateSeriesContentDto,
) {
  @ValidateNested()
  @IsArray()
  @Type(() => ContentIdDTO) // Specify the nested DTO type
  contents?: ContentIdDTO[];
}
