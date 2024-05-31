import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.services';
import { PrismaModule } from '../prisma/prisma.module';
import { ArtistsController } from './artists.controller';

@Module({
  imports: [PrismaModule],
  providers: [ArtistsService],
  controllers: [ArtistsController],
})
export class ArtistModule {}
