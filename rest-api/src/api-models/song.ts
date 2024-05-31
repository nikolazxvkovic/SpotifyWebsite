import { Artist } from './artist';

export class Song {
  id: string;
  name: string;
  popularity: number;
  releaseDate: Date;
  artistsInfo: Artist[];
}
