import { PartialType } from '@nestjs/mapped-types';
import { CreateWitnessAlertDto } from './create-witness-alert.dto';

export class UpdateWitnessAlertDto extends PartialType(CreateWitnessAlertDto) {
  id: number;
}
