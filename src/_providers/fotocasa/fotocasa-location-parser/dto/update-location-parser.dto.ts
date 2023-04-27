import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationParserDto } from './create-location-parser.dto';

export class UpdateLocationParserDto extends PartialType(
  CreateLocationParserDto,
) {
  id: number;
}
