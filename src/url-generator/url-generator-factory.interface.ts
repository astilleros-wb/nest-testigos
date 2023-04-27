import { MetadatumDto } from '../metadatum/dto/metadatum.dto';

export interface UrlGenerator {
  generate(metadatum: MetadatumDto): Promise<string[]>;
}
