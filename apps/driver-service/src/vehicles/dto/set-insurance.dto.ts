import { IsDateString } from 'class-validator';

export class SetInsuranceDto {
  @IsDateString()
  insuranceExpiry: string;
}
