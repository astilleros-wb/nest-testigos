import { PartialType } from '@nestjs/mapped-types';
import { CreateImageCheckerDto } from './create-image-checker.dto';

export class UpdateImageCheckerDto extends PartialType(CreateImageCheckerDto) {
  id: number;
}
