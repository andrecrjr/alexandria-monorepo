import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  IsJSON,
  IsUrl,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { ContentDTO } from 'src/content/content.dto';
import { CreateUserDTO } from 'src/users/User.dto';

export class CreateAuthorContentDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  bio?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  born?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  died?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  awards: string[];

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty()
  @IsOptional()
  @IsJSON()
  socialMedia?: any;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  bestSellers: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  influences: string[];

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  influenced: string[];

  @IsInt()
  @IsOptional()
  createdById?: number;

  @Type(() => CreateUserDTO)
  @ApiProperty()
  @IsOptional()
  createdBy: CreateUserDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContentDTO)
  contents: ContentDTO[];
}
