import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * @description  PassportStrategy(Strategy)相当于原生Passport.use(new Strategy()),并拓展了原生方法
 */

/**
 * passport-local策略主要作用是验证用户密码登录是否正确,然后交由下一步，或者抛出错误
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // passport-local 用例中，没有配置选项，因此我们的构造函数只是调用 super() ，没有 options 对象。
    /**
      usernameField 设置 name 字段, 默认 username
      passwordField 设置 password 字段, 默认 password
      passReqToCallback 设置 request 是否回调函数的第一个参数, 默认 true (是第一个参数)
      session 设置 是否支持 session 会话, 保持持久化登录状态, 默认 true
     */
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    console.log('loacl-payload:', username, password);
    if (!user) {
      throw new UnauthorizedException('验证失败');
    }
    // 返回的值自动创建一个 user 对象，并将其作为 req.user 分配给请求对象
    return user;
  }
}

// 原生passport是由策略（strategy）的两个步骤
// 1. Passport.use(new StrategyName([options,]callback))
// 2. passport.authenticate('local')方法的核心是从 req.body 中获取用户名和密码
// @nestjs/passport代码仓库：https://github.com/nestjs/passport
// @nestjs/passport主要作用是用nestjs的风格对Strategy进行了包装，返回一个抽象类(Abstract Class),extends后实例化时就是执行步骤一
// https://blog.csdn.net/shijue98/article/details/107389766
