import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { Property } from 'src/property/entities/property.entity';
import { Type } from 'class-transformer';
import { Provider } from '../../common/enums';

export class CreateAddDto {
  @IsString()
  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  provider_id: string;

  @IsString()
  url: string;

  @IsString()
  witness: string;

  @ValidateNested()
  @Type(() => Property)
  property: Property;
}
