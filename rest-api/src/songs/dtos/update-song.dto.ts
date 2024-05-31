import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Artist } from '../../api-models/artist';

/**
 * This is the class UpdateSongDto, used to validate the request body to update a song in the songs' controller.
 */
export class UpdateSongDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  popularity: number;

  @IsOptional()
  @IsNotEmpty()
  artistsInfo: Artist[];
}