import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

/**
 * @description: 调用第三方服务,并缓存接口(例如第三方token凭证)
 */
@Injectable()
export class ThirdPartyService {
  private APP_TOKEN_CACHE_KEY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {
    this.APP_TOKEN_CACHE_KEY = this.configService.get('APP_TOKEN_CACHE_KEY');
  }
  async getThirdToken() {
    let token: string;
    // 先从缓存取, 看有没有
    token = await this.cacheManager.get(this.APP_TOKEN_CACHE_KEY);
    if (!token) {
      /**
       * @description: 如果缓存没有, 请求第三方服务接口获取token
       */
      token = 'http service responed data';
      /**
       * @description: 设置缓存，详见nest文档 技术->高速缓存
       */
      this.cacheManager.set(this.APP_TOKEN_CACHE_KEY, token, 30 * 60);
    }
  }
}
