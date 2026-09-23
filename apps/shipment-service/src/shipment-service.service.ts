import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
