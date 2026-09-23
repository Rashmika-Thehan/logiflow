import { Controller, Get } from '@nestjs/common';
import { ShipmentServiceService } from './shipment-service.service';

@Controller()
export class ShipmentServiceController {
  constructor(private readonly shipmentServiceService: ShipmentServiceService) {}

  @Get()
  getHello(): string {
    return this.shipmentServiceService.getHello();
  }
}
