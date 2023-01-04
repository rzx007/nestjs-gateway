import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';

//  请求过程中的任意一步出错，都会进入过滤器
// Catch参数为空，捕获所有异常
@Catch()
// 可以继承HttpException拓展错误类型
// 定义返回错误的统一格式
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // exception当前正在处理的错误对象
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const request = ctx.getRequest();
    console.log('~~~进入异常拦截器~~~');
    // 获取异常状态码
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置错误信息
    const message = exception.message ? exception.message : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    const msgLog = {
      code: -1,
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: new ServiceUnavailableException().getResponse(),
    };
    Logger.error('错误消息', JSON.stringify(msgLog), 'HttpExceptionFilter');
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status).json(msgLog);
  }
}
