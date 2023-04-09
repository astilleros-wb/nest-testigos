import { PartialType } from '@nestjs/mapped-types';
import { CreateAddAlertDto } from './create-add-alert.dto';

export class UpdateAddAlertDto extends PartialType(CreateAddAlertDto) {
  id: number;
}
