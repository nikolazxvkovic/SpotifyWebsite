import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from '../api-models/artist';
import { SongQueryDTO } from './dtos/SongQueryDTO';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { UpdateSongDto } from './dtos/update-song.dto';
import { CreateSongDto } from './dtos/create-song.dto';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Gets all the songs, which can be filtered by name or year of release,
   * and which can be sorted based on release date or popularity in ascending or descending order.
   * The default sorting is based on popularity and is descending.
   * Also, it has pagination and can display anywhere from 1 to 100 songs at a time with a default of 10,
   * @param query: The filtering, ordering, and/or pagination parameters given as query parameters.
   */
  async getAllSongs(query: SongQueryDTO) {
    const year = query.year;
    const limit = query.limit;
    const offset = query.offset;
    const direction = query.orderDir;
    const order = query.orderBy;
    const first = new Date(year + '-1-1');
    const second = new Date(year + '-12-31');
    const whereClauseVar: whereClause = {};

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

    if (query.name !== undefined) {
      whereClauseVar.name = query.name;
    }

    return await this.prisma.song.findMany({
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
   * Deletes a song from the database by its unique ID.
   * @param id: The ID of the song to delete.
   */
  async deleteSongByID(id: string) {
    try {
      const deletedSong = await this.prisma.song.delete({
        where: { id: String(id) },
      });
    } catch (error) {
      console.log(error);
      if (
        error.code === 'P2025' &&
        error instanceof PrismaClientKnownRequestError
      ) {
        throw new HttpException('Song Not Found', 404);
      }
    }
  }

  /**
   * Gets all details of a song by its unique ID.
   * @param id: ID of song to get details of.
   */
  async getSongByID(id: string) {
    try {
      const song = await this.prisma.song.findUniqueOrThrow({
        where: { id: String(id) },
        select: {
          id: true,
          name: true,
          popularity: true,
          releaseDate: true,
          artistsInfo: true,
        },
      });
      return song;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException('Song Not Found', 404);
      }
    }
  }

  /**
   * Creates a song.
   * @param data: The request body which contains the id, name, popularity, release date, artist info of the song to be created.
   */
  async createSong(data: CreateSongDto) {
    try {
      const list = data.artistsInfo;
      await this.artistUpsert(list);
      const newSong = await this.prisma.song.create({
        data: {
          id: data.id,
          name: data.name,
          popularity: Number(data.popularity),
          releaseDate: new Date(data.releaseDate),
          artistsInfo: {
            connect: list.map((artist) => ({
              id: artist.id,
            })),
          },
        },
      });
      return newSong;
    } catch(error) {
      console.log(error);
      if (
        error.code === 'P2002' &&
        error instanceof PrismaClientKnownRequestError
      ) {
        throw new HttpException('Song ID already exists', 409);
      }
    }
  }

  /**
   * Creates artist if they don't exist in the database, otherwise does nothing.
   * @param data: List of artists to go through and check if they exist in the database.
   */
  async artistUpsert(data: Artist[]) {
    for (const artist of data) {
      await this.prisma.artist.upsert({
        where: {
          id: artist.id,
        },
        update: {},
        create: {
          id: artist.id,
          name: artist.name,
        },
      });
    }
  }

  /**
   * Updates a song info by ID.
   * @param id: id of song
   * @param data: information to be updated about the song such as name, popularity, and artists.
   */
  async updateSongByID(id: string, data: UpdateSongDto) {
    try {
      const list = data.artistsInfo;
      await this.artistUpsert(list);
      const updateVar: updateData = {};

      if (data.name !== undefined) {
        updateVar.name = data.name;
      }

      if (data.popularity !== undefined) {
        updateVar.popularity = Number(data.popularity);
      }
      if (list != null) {
        await this.prisma.song.update({
          where: { id: String(id) },
          data: {
            ...updateVar,
            artistsInfo: {
              set: [],
              connect: list?.map((artist) => ({
                id: artist.id,
              })),
            },
          },
        });
      }
      await this.prisma.song.update({
        where: { id: String(id) },
        data: {
          ...updateVar,
        },
      });
    } catch(error){
      console.log(error);
      if (
        error.code === 'P2025' &&
        error instanceof PrismaClientKnownRequestError
      ) {
        throw new HttpException('Song Not Found', 404);
      }
    }
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
 * This is the interface whereClause, which allows us to manipulate our prisma queries of filtering based on year or name easily.
 */
interface whereClause {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  releaseDate?: {};
}

/**
 * This is the interface updateData, which allows us to manipulate our prisma update queries with a new name of a song or popularity changes.
 */
interface updateData {
  name?: string;
  popularity?: number;
}