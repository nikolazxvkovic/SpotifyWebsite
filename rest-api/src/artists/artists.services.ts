import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArtistQueryDTO } from './dtos/ArtistQueryDTO';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gets all artist songs by Artist ID, the data is sorted by popularity and is descending.
   * This is the default. Also, they can be filtered by year of release.
   * Popularity and year of release can be ascending/descending.
   * It makes use of pagination and can display anywhere from 1 to 100 songs at a time with a default of 10
   * @param artistID The unique ID of the artist
   * @param query The filtering, ordering, and/or pagination parameters given as query parameters.
   */
  async getSongsByArtistID(artistID: string, query: ArtistQueryDTO) {
    const year = query.year;
    const limit = query.limit;
    const offset = query.offset;
    const direction = query.orderDir;
    const order = query.orderBy;
    const first = new Date(year + '-1-1');
    const second = new Date(year + '-12-31');
    if(!await this.checkIfArtistExists(artistID)){
      throw new HttpException('Artist Not Found', 404);
    }
    const whereClauseVar: whereClause = {
      artistsInfo: {some: {id: artistID}}
    };

    if (year !== undefined) {
      whereClauseVar.releaseDate = {
        lte: second,
        gte: first,
      };
    }
    const configVar: config = {
      orderBy: {
        [order]: direction,
      },
      take: limit,
      skip: offset,
    };

    return this.prisma.song.findMany({
      where: whereClauseVar,
      ...configVar,
      select: {
        id: true,
        name: true,
        popularity: true,
        releaseDate: true,
        artistsInfo: true,
      },
    });
  }

  /**
   * Gets all artist songs by the artist name. If artist name is not unique,
   * it retrieves all artists with the same name.
   * @param artistName The name of the artist which is not unique.
   * @param query The filtering, ordering, and/or pagination parameters given as query parameters.
   */
  async getSongsByArtistName(artistName: string, query: ArtistQueryDTO) {
    const numOfArtists = await this.findNumOfArtists(artistName);
    if (numOfArtists == 1) {
      const artistID = await this.getArtistID(artistName);
      return this.getSongsByArtistID(artistID.id, query);
    } else if (numOfArtists > 1) {
      return this.getAllArtistsWithSameName(artistName);
    } else {
      throw new HttpException('Artist Not Found', 404);
    }
  }

  /**
   * Deletes every single song for an artist given an artist ID.
   * @param artistID ID of the artist which is unique.
   */
  async deleteSongsByArtistID(artistID: string) {
    try {
      await this.prisma.artist.update({
        where: { id: String(artistID) },
        data: {
          songs: { set: [] },
        },
      });

      return this.prisma.song.deleteMany({
        where: {
          artistsInfo: {
            none: {}
          }
        },
      });
    } catch (error){
      console.log(error);
      if (
        error.code === 'P2025' &&
        error instanceof PrismaClientKnownRequestError
      ) {
        throw new HttpException('Artist Not Found', 404);
      }
    }
  }

  /**
   * Deletes every single song for an artist given an artist name if name is unique,
   * otherwise displays all artists with the same name.
   * @param artistName Name of the artist which is not unique.
   */
  async deleteSongsByArtistName(artistName: string) {
    const numOfArtists = await this.findNumOfArtists(artistName);
    if (numOfArtists == 1) {
      const artistID = await this.getArtistID(artistName);
      await this.deleteSongsByArtistID(artistID.id);
    } else if (numOfArtists > 1) {
      return this.getAllArtistsWithSameName(artistName);
    } else if (numOfArtists == 0) {
      throw new HttpException('Artist Not Found', 404);
    }
  }

  /**
   * Gets the Artist Summary by the artist ID.
   * An artist summary consists of: number of songs, earliest and latest release by date,
   * and the highest popularity song amongst all songs
   * @param artistID The ID of the artist which is unique.
   */
  async getArtistSummaryByID(artistID: string) {
    if(!await this.checkIfArtistExists(artistID)){
      throw new HttpException('Artist Not Found', 404);
    } else {
      let [name, numOfSongs, earliestSong, latestSong, mostPopularSong] =
        await this.prisma.$transaction([
          this.prisma.artist.findUnique({
            where: {
              id: artistID
            },
            select: {
              name: true
            }
          }),
          this.prisma.song.count({
            where: {
              artistsInfo: {
                some: { id: String(artistID) }
              }
            }
          }),
          this.prisma.song.findFirst({
            where: {
              artistsInfo: {
                some: {
                  id: String(artistID)
                }
              }
            },
            include: {
              artistsInfo: true,
            },
            orderBy: {
              releaseDate: 'asc'
            },
            take: 1,
          }),
          this.prisma.song.findFirst({
            where: {
              artistsInfo: {
                some: {
                  id: String(artistID)
                }
              }
            },
            include: {
              artistsInfo: true,
            },
            orderBy: {
              releaseDate: 'desc'
            },
            take: 1,
          }),
          this.prisma.song.findFirst({
            where: {
              artistsInfo: {
                some: {
                  id: String(artistID)
                }
              }
            },
            include: {
              artistsInfo: true,
            },
            orderBy: {
              popularity: 'desc'
            },
            take: 1,
          }),
        ]);

      console.log(earliestSong);
      return [name, numOfSongs, earliestSong, latestSong, mostPopularSong, artistID];
    }
  }

  /**
   * Gets the Artist Summary by the artist name.
   * If artist name is not unique,
   * it retrieves all artists with the same name. Then the artist summary can be chosen by
   * the artist ID.
   * An artist summary consists of: number of songs, earliest and latest release by date,
   * and the highest popularity song amongst all songs
   * @param artistName The name of the artist.
   */
  async getArtistSummaryByName(artistName: string) {
    const numOfArtists = await this.findNumOfArtists(artistName);
    if (numOfArtists == 1) {
      const artistID = await this.getArtistID(artistName);
      return this.getArtistSummaryByID(artistID.id);
    } else if (numOfArtists > 1) {
      return this.getAllArtistsWithSameName(artistName);
    } else if (numOfArtists == 0){
      throw new HttpException('Artist Not Found', 404);
    }
  }

  /**
   * Gets all the Artists with the same name and gets their average popularity.
   * Since artist names are not unique
   * @param artistName The name of the artist.
   */
  async getAllArtistsWithSameName(artistName: string) {
    let artists = await this.prisma.artist.findMany({
      where: { name: String(artistName) },
      select: {
        id: true,
        name: true,
      },
    });
    let aggregates = [];
    for(let artist of artists) {
      let aggregatePopularity = await this.prisma.song.aggregate({
        where: {
          artistsInfo: {
            some: {id: artist.id}
          }
        },
        _avg: {
          popularity: true
        },
      });
      aggregates.push(aggregatePopularity);
    }
    let multiArtistList = [];
    for(let i = 0; i < artists.length; i++){
      let popul:number = aggregates[i]._avg.popularity;
      if(popul === null){
        popul = 0;
      }
      let multiArtist = {
        id: artists[i].id,
        name: artists[i].name,
        average: popul
      }
      multiArtistList.push(multiArtist);
    }
    console.log(multiArtistList);
    return multiArtistList;
  }

  /**
   * Gets the artist ID given an artist name.
   * @param artistName The name of the artist.
   */
  async getArtistID(artistName: string){
    return this.prisma.artist.findFirst({
      where: {
        name: String(artistName)
      }
    });
  }

  /**
   * A helper function used to count the number of artists with a given artist name.
   * @param artistName The name of the artist.
   */
  async findNumOfArtists(artistName: string){
    return this.prisma.artist.count({
      where: {
        name: String(artistName),}
    });
  }

  /**
   * A helper function to check if the artist exists given an artist ID.
   * @param artistID
   */
  async checkIfArtistExists(artistID: string) {
    const num = await this.prisma.artist.count({
      where: {
        id: artistID,
      },
    });
    console.log(num);
    return num == 1;
  }
}

/**
 * This is the interface config which allows us to manipulate our prisma queries in terms of sorting and pagination easily.
 */
interface config {
  orderBy?: {};
  take: number;
  skip: number;
}

/**
 * This is the interface whereClause, which allows us to manipulate our prisma queries of filtering based on year or artist ID/name easily.
 */
interface whereClause {
  artistsInfo: {};
  // eslint-disable-next-line @typescript-eslint/ban-types
  releaseDate?: {};
}

/**
 * This is the interface multipleArtists, which is used in finding multiple artists with the same name.
 */
