import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext) {
    console.log('进入guard, local用户密码策略验证');
    return super.canActivate(context);
  }
}
