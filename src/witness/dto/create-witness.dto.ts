import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  Min,
  ValidateNested,
} from 'class-validator';
import { Property } from 'src/property/entities/property.entity';
import { WitnessAlert } from 'src/witness-alert/entities/witness-alert.entity';

export class CreateWitnessDto {
  @IsNumber()
  @Min(0)
  version: number;

  @ValidateNested()
  @Type(() => Property)
  property: Property;

  @IsArray()
  @ValidateNested()
  @Type(() => WitnessAlert)
  alerts: WitnessAlert[];

  @IsArray()
  @ValidateNested()
  @IsMongoId()
  adds: string[];
}
