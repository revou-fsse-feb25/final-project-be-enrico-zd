import { HttpStatus } from '@nestjs/common';
import { RepositoryException } from './exception.repository';

export class AttendanceNotFoundRepositoryException extends RepositoryException {
  constructor(message: string = 'attendance not found') {
    super(message, HttpStatus.NOT_FOUND);
    this.name = AttendanceNotFoundRepositoryException.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
