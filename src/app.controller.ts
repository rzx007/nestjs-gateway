import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller({
  // version: '1',
  // path: 'app',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Version('1')
  @Get('/hello')
  getHello1(): string {
    return 'hello v1';
  }
  @Get('/hello')
  getHello12(): string {
    return 'hello default';
  }
}
