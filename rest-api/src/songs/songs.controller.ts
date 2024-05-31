import {
  Body, Controller, Delete,
  Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, Res, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongQueryDTO } from './dtos/SongQueryDTO';
import { UpdateSongDto } from './dtos/update-song.dto';
import { CreateSongDto } from './dtos/create-song.dto';
import * as convertor from 'json-2-csv';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe())
  async UpdateSong(@Param('id') songID: string, @Body() putData: UpdateSongDto) {
    return this.songsService.updateSongByID(songID, putData);
  }
  @Get(':id')
  @UsePipes(new ValidationPipe())
  async GetSong(@Param('id') songID: string, @Res() response, @Req() request) {
    console.log(request.get('Accept'))
    const query = await this.songsService.getSongByID(songID);
    const answer = [];
    answer.push(query);

    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(answer, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(query);
    }
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async Delete(@Param('id') songId: string) {
    return this.songsService.deleteSongByID(songId);
  }
  @Get()
  @UsePipes(new ValidationPipe({transform: true}))
  async GetSongs(@Query() body: SongQueryDTO, @Res() response, @Req() request) {
    const query = await this.songsService.getAllSongs(body);
    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(query, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(query);
    }
  }

  @Post()
  async CreateSong(@Body() postData: CreateSongDto, @Res() response, @Req() request) {
    const query = await this.songsService.createSong(postData);
    const answer = [];
    answer.push(query);
    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(answer, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(query);
    }
  }
}