import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {
    //
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).send({
      ...this.extractMessage(message),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private extractMessage(message: string | any): object {
    if (typeof message === 'string') {
      return { message };
    }
    return { message: message?.message || 'Unknown' };
  }
}
