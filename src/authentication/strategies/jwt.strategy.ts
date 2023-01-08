/*
 * @Author: 阮志雄
 * @Date: 2023-01-08 18:42:30
 * @LastEditTime: 2023-01-08 23:03:59
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \gateway\src\authentication\strategies\jwt.strategy.ts
 */
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    // passport-jwt 用例中，没有配置选项，因此我们的构造函数只是调用 super() ，没有 options 对象。
    // super() 其实调用的是 new JwtStrategy(options, callback)
    /**
     * jwtFromRequest :提供从请求中提取 JWT 的方法
     */

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rzx007',
    });
  }

  async validate(payload: { sub: any; username: any }) {
    console.log('jwt-payload:', payload);
    // payload是解码后的token对象
    // 默认长这样 { username: 'rzx', sub: 24, iat: 1673176415, exp: 1673176715 }
    return { ...payload };
  }
}

// 原生passport是由策略（strategy）的两个步骤
// 1. Passport.use(new StrategyName([options,]callback))
// 2. passport.authenticate('local')方法的核心是从 req.body 中获取用户名和密码
