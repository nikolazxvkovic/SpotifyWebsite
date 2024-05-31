import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import * as process from 'process';

const prisma = new PrismaClient();

type ArtistExtract = {
  id: string;
  followers: number;
  genres: JSON[];
  name: string;
  popularity: number;
};

type Artist = {
  id: string;
  name: string;
}

type SongExtract = {
  id: string;
  name: string;
  popularity: number;
  duration_ms: string;
  explicit: string;
  artists: string[];
  id_artist: string;
  release_date: string;
  danceability: string;
  musical_key: string;
  loudness: string;
  time_signature: string;
}

type Song = {
  id: string;
  name: string;
  popularity: number;
  releaseDate: Date;
}



  async function main() {
    const csvFilePathArtists = path.resolve("C:\\Users\\nikol\\Documents\\BSc Computing Science\\2nd Year\\Web Engineering\\Proper Repo\\2022-Group-22\\rest-api\\resources//artists.csv");
    const csvFilePathSongs = path.resolve("C:\\Users\\nikol\\Downloads\\tracks_no_index.csv");
    const headers = ['id', 'followers', 'genres', 'name', 'popularity'];
    const songHeaders = ['id', 'name', 'popularity', 'duration_ms', 'explicit', 'artists', 'id_artist', 'release_date', 'danceability', 'musical_key', 'loudness', 'time_signature'];
    const fileContent = readFileSync(csvFilePathArtists, { encoding: 'utf-8' });
    const songFileContent = readFileSync(csvFilePathSongs,{ encoding: 'utf-8' });


    parse(songFileContent, {
      delimiter: ',',
      columns: songHeaders,
      fromLine: 29514,

      cast: (columnValue, context) => {
        if (context.column === 'popularity') {
          return parseInt(columnValue, 10);
        }
        return columnValue;
      }
    }, async (error, result: SongExtract[]) => {
      if (error) {
        console.error(error);
      }
      const ids = result.map((s => s.id));
      const artistIDS = result.map(s => s.id_artist);
      // console.log(artistIDS);

      console.log("Cheif we finna start no cap");

      for(let i = 0; i < ids.length; i++){
      const actual = artistIDS[i];
      let str: string = actual.split("\'").join("");
      str = str.replace('[', '');
      str = str.replace(']', '');
      str = str.split(" ").join("");
      const strArray = str.split(",");

        try {
          await prisma.song.update({
              where: { id: String(ids[i])},
              data: {
                artistsInfo: {
                  set: [],
                  connect: strArray.map((artist) => ({
                    id: artist,
                  })),
                },
              },
            });
            console.log(`updated song ` + ids[i] );
          } catch (error) {
            console.log("error occurred", error);
            console.log(actual);
            console.log(strArray);
          }
      }

        // for(let song of songs) {
        // try {
        //   await prisma.song.create({
        //     data: song
        //   })
        //   console.log(`updated song ${song.id}`)
        // } catch (error) {
        //   console.log("error occurred", error);
        //   // process.exit(1);
        // }

    //  }
      //   await prisma.song.createMany({
      //     data: songs
      // });
      console.log('success');
    //  });


    // parse(fileContent, {
    //   delimiter: ',',
    //   columns: headers,
    // }, async (error, result: Artist[]) => {
    //   if (error) {
    //     console.error(error);
    //   }
    //   const ids = result.map(a => a.id);
    //   const names = result.map(a => a.name);
    //   const artists: Artist[] = [];
    //   for(let i = 0; i < ids.length; i++){
    //     let artist = {
    //       id: ids[i],
    //       name: names[i]
    //     }
    //     artists.push(artist);
    //   }
    //   console.log(artists);
    //   //await prisma.artist.deleteMany({});
    //
    //     await prisma.artist.createMany({
    //       data: artists
    //   });
    //   console.log('success');
     });
}
main()

  .then(async () => {

    await prisma.$disconnect()

  })

  .catch(async (e) => {

    console.log("error occurred")

    await prisma.$disconnect()

    process.exit(1)

  })



//   const ids = result.map(s => s.id);
//   const names = result.map(s => s.name);
//   const popularities = result.map(s => s.popularity);
//   const dates = result.map(s => s.release_date);
//   const invalid = new Date('invalidDate');
//   const datesD: Date[]  = []
//   for(const d of dates) {
//
//     if(d.length === 4 && !isNaN(Number(d))){
//       d.concat('-1-1');
//     }
//     if(new Date(d).toDateString() !== "Invalid Date"){
//       datesD.push(new Date(d));
//       } else {
//         console.log(d + '0');
//       }
//   }
//
//
//   const songs: Song[] = [];
//   for (let i = 0; i < ids.length; i++) {
//       let song = {
//         id: ids[i],
//         name: names[i] || '',
//         popularity: popularities[i],
//         releaseDate: datesD[i],
//       }
//       songs.push(song);
// }
//

