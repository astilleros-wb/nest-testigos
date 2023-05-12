import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetadatumDto } from 'src/metadatum/dto/metadatum.dto';
import { UrlGeneratorFactory } from 'src/url-generator/url-generator-factory.factory';
import { UrlScrapperFactory } from 'src/url-scrapper/url-scrapper.factory';
import { WitnessService } from 'src/witness/witness.service';
import { WitnessList } from './entities/witness-list.entity';

@Injectable()
export class WitnessListService {
  constructor(
    @InjectModel(WitnessList.name)
    private readonly witnessListModel: Model<WitnessList>,
    private readonly witnessService: WitnessService,
    private readonly urlGeneratorFactory: UrlGeneratorFactory,
    private readonly urlScrapperFactory: UrlScrapperFactory,
  ) {}

  async generateListFromMetadatum(
    metadatum: MetadatumDto,
  ): Promise<WitnessList> {
    console.log(metadatum);

    const urls = await this.urlGeneratorFactory.generateUrls(metadatum);
    console.log(urls);
    const new_adds = urls.map((url: string) =>
      this.urlScrapperFactory.scrapp(url),
    );

    const now = new Date();
    const witnesses = await this.witnessService.findByMetadata(metadatum);

    const list = await this.witnessListModel.create({
      name: 'Prueba',
      outdated: false,
      keepTrack: true,
      createdAt: now,
      updatedAt: now,
      metadatum,
      items: witnesses,
    });

    return list;
  }
}
