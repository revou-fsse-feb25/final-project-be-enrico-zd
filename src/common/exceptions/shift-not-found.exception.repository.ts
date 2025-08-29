import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class ShiftNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'shift not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = ShiftNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
