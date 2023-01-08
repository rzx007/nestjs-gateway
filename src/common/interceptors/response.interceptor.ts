import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('进入全局过滤器');
    // const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    // 这里也可以设置(全局)响应头
    res.setHeader('x-powered-by', 'nono1');
    return next.handle().pipe(
      map((data) => {
        console.log('退出全局过滤器, 没有错误将返回结果,结束请求');
        return {
          data,
          code: 1,
          message: 'success',
          success: true,
        };
      }),
    );
  }
}

/*
拦截器作用
在函数执行之前/之后绑定额外的逻辑
转换从函数返回的结果
转换从函数抛出的异常
扩展基本函数行为
根据所选条件完全重写函数 (例如, 缓存目的)
*/
