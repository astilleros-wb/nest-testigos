import { PartialType } from '@nestjs/mapped-types';
import { CreateWitnessDto } from './create-witness.dto';

export class UpdateWitnessDto extends PartialType(CreateWitnessDto) {
  id: number;
}
