import { IsEnum, IsMongoId, IsNumber, IsString, Min } from 'class-validator';
import { AlertType } from 'src/common/enums';

export class CreateWitnessAlertDto {
  @IsMongoId()
  witness: string;

  @IsNumber()
  @Min(0)
  version: number;

  @IsString()
  @IsEnum(AlertType)
  type: AlertType;

  @IsNumber()
  @Min(0)
  old?: number;

  @IsNumber()
  @Min(0)
  current: number;
}
