import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class LeaveTypeNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'leave type not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = LeaveTypeNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
