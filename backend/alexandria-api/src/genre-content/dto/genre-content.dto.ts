import { Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';
import { ContentDTO } from 'src/content/content.dto';
import { SeriesContent } from 'src/series-content/entities/series-content.entity';

export class GenreContentDTO {
  @IsInt()
  id: number;
  @IsString()
  name: string;

  @IsDate()
  createdAt: Date; // Optional: Include timestamps if needed
  @IsDate()
  updatedAt: Date; // Optional: Include timestamps if needed

  @Type(() => SeriesContent)
  series?: SeriesContent[];

  @Type(() => ContentDTO)
  contents?: ContentDTO[];
}
