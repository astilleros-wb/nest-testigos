import { Injectable } from '@nestjs/common';
import { FotocasaUrlGeneratorService } from '../_providers/fotocasa/fotocasa-url-generator/fotocasa-url-generator.service';
import { MetadatumDto } from '../metadatum/dto/metadatum.dto';
import { Provider } from 'src/common/enums';

@Injectable()
export class UrlGeneratorFactory {
  constructor(
    private readonly fotocasaUrlGenerator: FotocasaUrlGeneratorService,
  ) {}

  async generateUrls(metadatum: MetadatumDto): Promise<string[]> {
    if (!metadatum.providers?.length)
      throw new Error('Invalid providers casting.');

    const urls = await Promise.all(
      metadatum.providers?.map(async (provider: Provider) => {
        if (provider == Provider.fotocasa)
          return await this.fotocasaUrlGenerator.generate(metadatum);
        return undefined;
      }),
    );

    return urls.flat();
  }
}
