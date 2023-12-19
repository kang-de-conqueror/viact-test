import { BootstrapConsole } from 'nestjs-console';
import { ConsoleContextModule } from './console/console.module';

const bootstrap = new BootstrapConsole({
  module: ConsoleContextModule,
  useDecorators: true,
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
