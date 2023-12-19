import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { SharedModule } from '../shared/shared.module';
import { SeedConsole } from './seed';

@Module({
  imports: [SharedModule, ConsoleModule],
  providers: [SeedConsole],
  exports: [SeedConsole],
})
export class ConsoleContextModule {}
