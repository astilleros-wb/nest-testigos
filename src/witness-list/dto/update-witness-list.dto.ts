import { PartialType } from '@nestjs/mapped-types';
import { CreateWitnessListDto } from './create-witness-list.dto';

export class UpdateWitnessListDto extends PartialType(CreateWitnessListDto) {
  id: number;
}
