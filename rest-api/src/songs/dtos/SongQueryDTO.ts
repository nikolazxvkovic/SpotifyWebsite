import {
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  IsString,
  IsNumberString,
  Length,
  IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';

function transformOrderDir(obj: TransformFnParams) {
  if (obj.value == undefined) {
    return undefined;
  } else if (obj.value.toLowerCase().trim() == 'asc') {
    return 'asc';
  } else if (obj.value.toLowerCase().trim() == 'desc') {
    return 'desc';
  }
  return undefined;
}

function transformOrderBy(obj: TransformFnParams) {
  if (obj.value == undefined) {
    return undefined;
  } else if (obj.value.toLowerCase().trim() == 'popularity') {
    return 'popularity';
  } else if (obj.value.toLowerCase().trim() == 'releasedate') {
    return 'releaseDate';
  }
  return undefined;
}

/**
 * This is the class CreateSongDto, used to validate incoming query parameters in the songs' controller.
 */
export class SongQueryDTO {
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit = 10;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset = 0;

  @IsOptional()
  @IsNumberString()
  @Length(4, 4, { message: "year's length must be  4" })
  year: string;

  @IsString({ message: "Order direction should either be 'asc' or 'desc'" })
  @Transform(transformOrderDir)
  orderDir: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsString({ message: "Ordering should be either by 'popularity' or by 'releaseDate'" })
  @Transform(transformOrderBy)
  orderBy: 'popularity' | 'releaseDate' = 'popularity';
}
