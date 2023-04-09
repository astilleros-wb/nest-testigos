import { PartialType } from '@nestjs/mapped-types';
import { CreateAddVersionDto } from './create-add-version.dto';

export class UpdateAddVersionDto extends PartialType(CreateAddVersionDto) {
  id: number;
}
