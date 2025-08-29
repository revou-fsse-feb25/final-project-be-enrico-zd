import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class LeaveRequestNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'leave request not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = LeaveRequestNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
