import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistModule } from './artists/artists.module';

@Module({
  imports: [SongsModule, PrismaModule, ArtistModule],
})
export class AppModule {}
