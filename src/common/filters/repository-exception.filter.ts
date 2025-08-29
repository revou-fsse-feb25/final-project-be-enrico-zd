import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RepositoryException } from '../exceptions/exception.repository';
import { ErrorBody } from '../dto/res/error.body.dto';

@Catch(RepositoryException)
export class RepositoryExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: RepositoryException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const responseBody: ErrorBody = {
      message: exception.message ?? 'something wrong on our side',
      error: exception.name ?? 'internal service error',
      statusCode: exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
    };

    httpAdapter.reply(res, responseBody, responseBody.statusCode);
  }
}
