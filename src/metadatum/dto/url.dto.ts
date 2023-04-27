import { IsString, Length } from 'class-validator';

export class urlDto {
  @IsString()
  @Length(0, 200)
  url: string;
}
