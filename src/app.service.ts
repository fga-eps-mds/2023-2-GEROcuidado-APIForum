import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  heathCheck() {
    return {
      message: 'GEROcuidadoAPIForum health check Ok!',
      data: {},
    };
  }
}
