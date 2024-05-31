import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Artist } from '../../api-models/artist';

/**
 * This is the class CreateSongDto, used to validate the request body to create a song in the songs' controller.
 */
export class CreateSongDto {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  popularity: number;

  @IsNotEmpty()
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  artistsInfo: Artist[];
}