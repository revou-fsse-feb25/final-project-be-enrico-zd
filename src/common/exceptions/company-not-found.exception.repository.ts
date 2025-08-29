import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class CompanyNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'company not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = CompanyNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
