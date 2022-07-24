import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/api/hellow')
  test() {
    return "hellow"
  }

  @Get('/template/hellow')
  testTemplate() {
    return "hellow Template"
  }
}
