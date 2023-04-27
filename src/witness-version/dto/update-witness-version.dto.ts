import { PartialType } from '@nestjs/mapped-types';
import { CreateWitnessVersionDto } from './create-witness-version.dto';

export class UpdateWitnessVersionDto extends PartialType(
  CreateWitnessVersionDto,
) {
  id: number;
}
