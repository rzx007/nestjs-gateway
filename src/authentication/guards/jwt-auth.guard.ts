import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  // 白名单, 直接放行
  private whiteList: string[] = ['/app', '/auth/login', '/user/add'];

  canActivate(context: ExecutionContext) {
    console.log('进入guard, jwt策略验证');
    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session

    // if (process.env.RUNNING_ENV === 'dev') return true;

    const request = context.switchToHttp().getRequest();
    // 白名单直接放行
    if (this.whiteList.includes(request.url)) {
      return true;
    }

    // @SkipAuth() 注解的控制器直接放行
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    // skip
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
