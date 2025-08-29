import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthResponseBody } from '../../auth/dto/res/auth.body.dto';
import { UserResponseDTO } from '../../users/dto/res/user.body.dto';
import { mapEntityToDto } from 'src/utils/mapper.utils';
import { UserCompanyResponseDTO } from 'src/user-company-detail/dto/res/User-company.body.dto';
import { CompanyResponseDTO } from 'src/company/dto/res/company.body.dto';
import { LeaveRequestResponseDTO } from 'src/leave-request/dto/res/leave-request.body.dto';
import { LeaveTypeResponseDTO } from 'src/leave-type/dto/res/leave-type.body.dto';
import { ShiftResponseDTO } from 'src/shifts/dto/res/shift.body.dto';
import { AttendanceResponseDto } from 'src/attendance/dto/res/attendance.body.dto';

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    let dtoClass: any;
    if (request.url.includes('/users')) {
      dtoClass = UserResponseDTO;
    } else if (request.url.includes('/auth')) {
      dtoClass = AuthResponseBody;
    } else if (request.url.includes('/user-company-detail')) {
      dtoClass = UserCompanyResponseDTO;
    } else if (request.url.includes('/company')) {
      dtoClass = CompanyResponseDTO;
    } else if (request.url.includes('/leave-request')) {
      dtoClass = LeaveRequestResponseDTO;
    } else if (request.url.includes('/leave-type')) {
      dtoClass = LeaveTypeResponseDTO;
    } else if (request.url.includes('/shifts')) {
      dtoClass = ShiftResponseDTO;
    } else if (request.url.includes('/attendance')) {
      dtoClass = AttendanceResponseDto;
    }

    return next.handle().pipe(
      map((data) => {
        if (!dtoClass || !data) return data;

        if (Array.isArray(data)) {
          return data.map((item) => mapEntityToDto(dtoClass, item));
        } else {
          return mapEntityToDto(dtoClass, data);
        }
      }),
    );
  }
}
