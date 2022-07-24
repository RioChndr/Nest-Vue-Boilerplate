import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({})
export class AppModule {
  static register(options: { serveStatic?: boolean } = {}): DynamicModule {
    const imports: any[] = []
    if (options.serveStatic) {
      imports.push(ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'dist-client'),
      }))
    }

    return {
      module: AppModule,
      imports,
      controllers: [AppController],
      providers: [AppService],
    }
  }
}
