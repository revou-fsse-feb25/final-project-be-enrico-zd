import { HttpStatus } from '@nestjs/common';

export class RepositoryException extends Error {
  constructor(
    message: string = 'repository error',
    public readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = RepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
