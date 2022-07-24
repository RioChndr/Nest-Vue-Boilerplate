import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import { ClientRender, serverDevClient } from 'client/client-render';
import { ConfigApp } from './config/app';
import { Logger } from '@nestjs/common';

const isProduction = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register({
    serveStatic: isProduction && ConfigApp.serveStaticClient
  }));
  if (!isProduction && ConfigApp.serveStaticClient) {
    const clientDir = join(process.cwd(), ConfigApp.clientDir)

    let client = await serverDevClient(clientDir)
    app.use(client.middlewares)
    app.use(...ClientRender(clientDir, ConfigApp.prefixApi))
  }

  const port = process.env.PORT || 3000
  const messageFrontend = !isProduction ? "Frontend DEV run with server vite" : "Frontend run using folder dist-client"
  await app.listen(port);
  Logger.log(`App run on localhost:${port} ${messageFrontend}`)
}
bootstrap();
