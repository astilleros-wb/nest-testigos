import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Metadatum } from 'src/metadatum/entities/metadatum.entity';
import { ListItem } from '../entities/list-item.entity';

export class CreateWitnessListDto {
  @IsString()
  name: string;

  @IsBoolean()
  outdated: boolean;

  @IsBoolean()
  keepTrack: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ValidateNested()
  @Type(() => Metadatum)
  metadatum: Metadatum;

  @IsArray()
  @ValidateNested()
  @Type(() => ListItem)
  items: ListItem[];
}
