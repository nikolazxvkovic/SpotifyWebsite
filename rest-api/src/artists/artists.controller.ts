import {
  Controller,
  Delete,
  Get, HttpCode, HttpStatus,
  Param, Query, Req, Res, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ArtistsService } from './artists.services';
import { ArtistQueryDTO } from './dtos/ArtistQueryDTO';
import { Response } from 'express';
import * as convertor from 'json-2-csv';

@Controller('artists')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}
  @Get(':id=id/songs')
  @UsePipes(new ValidationPipe({transform: true}))
  async GetArtistSongsById(@Param('id') artistID: string,
                           @Query() query: ArtistQueryDTO, @Res() response, @Req() request) {
    const reply = await this.artistService.getSongsByArtistID(artistID, query);
    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(reply, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(reply);
    }
  }

  @Get(':name=name/songs')
  @UsePipes(new ValidationPipe({transform: true}))
  async GetArtistSongsByName(@Param('name') artistName: string,  @Query() query: ArtistQueryDTO, @Res() response, @Req() request) {
    const reply = await this.artistService.getSongsByArtistName(artistName, query);
    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(reply, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(reply);
    }
  }
  @Delete(':id=id/songs')
  @HttpCode(HttpStatus.NO_CONTENT)
  async DeleteArtistSongsById(@Param('id') artistID: string) {
    return this.artistService.deleteSongsByArtistID(artistID);
  }

  @Delete(':name=name/songs')
  async DeleteArtistSongsByName(@Param('name') artistName: string, @Res() res: Response, @Req() req) {
    const check = await this.artistService.deleteSongsByArtistName(artistName);
    if (check === undefined) {
      res.status(HttpStatus.NO_CONTENT).send();
    } else {
      if (req.get('Accept') === 'text/csv') {
        convertor.json2csv(check, (err, csv) => {
          res.status(HttpStatus.OK).send(csv);
        });
      } else {
        res.status(HttpStatus.OK).send(check);
      }
    }
  }

  @Get(':id=id/summary')
  async GetArtistSummaryByID(@Param('id') artistID: string, @Res() response, @Req() request) {
    const r = await this.artistService.getArtistSummaryByID(artistID);
    const reply = [];
    reply.push(r);
    if(request.get('Accept') === 'text/csv'){
      convertor.json2csv(reply, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(reply);
    }
  }

  @Get(':name=name/summary')
  async GetArtistSummaryByName(@Param('name') artistName: string, @Res() response, @Req() request) {
    const r = await this.artistService.getArtistSummaryByName(artistName);
    const reply = [];
    reply.push(r);
    if(request.get('Accept') === 'text/csv'){
      console.log("csv");
      convertor.json2csv(reply, (err, csv) => {
        response.send(csv);
      });
    } else {
      response.send(reply);
    }
  }

}