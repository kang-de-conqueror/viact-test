import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';

@Module({
  imports: [SharedModule],
  providers: [GenreService, GenreResolver],
})
export class GenreModule {}
