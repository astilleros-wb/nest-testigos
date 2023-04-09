import { IsString, Length } from "class-validator";

export class CreateMetadatumDto {
    @IsString()
    @Length(0, 200)
    url: string
}
