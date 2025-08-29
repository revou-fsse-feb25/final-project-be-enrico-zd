import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class UserCompanyNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'user company detail not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = UserCompanyNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
