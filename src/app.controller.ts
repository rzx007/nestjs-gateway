import { Controller, Get, Query, Redirect, Res, UseGuards, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AppService } from './app.service';
import { Role } from './authorization/enums/role.enum';
import { RolesGuard } from './authorization/guards/roles.guard';
import { Roles } from './authorization/roles.decorator';

@Controller({
  // version: '1',
  // path: 'app',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Version('1')
  @Get('/hello')
  getHello1(): string {
    return 'hello v1';
  }
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get('/hello')
  getHello12(): string {
    const name = this.configService.get('TEST_VALUE').name;
    return name + ' hello default';
  }
  // 重定向
  @Get('docs')
  @Redirect('https://docs.nestjs.cn', 302)
  getDocs(@Query('version') version: string, @Res() res: Response) {
    if (version && version === '9') {
      return res.redirect('https://docs.nestjs.cn/9/firststeps');
    }
  }
}
