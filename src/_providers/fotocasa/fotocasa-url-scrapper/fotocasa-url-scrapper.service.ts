import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateAddDto } from 'src/add/dto/create-add.dto';
import { Provider, Transaction } from 'src/common/enums';
import { Property } from 'src/property/entities/property.entity';
import { UrlScrapper } from 'src/url-scrapper/url-scrapper.interface';
import {
  conservationToCode,
  FotoToMetaTypology,
  mapExtraFeatureFromScrap,
  transactionCodeToCode,
} from '../enums';
import { fotocasaAdd } from './fotocasa.add';
import { AddService } from 'src/add/add.service';

@Injectable()
export class FotocasaUrlScrapperService implements UrlScrapper {
  constructor(private readonly addService: AddService) {}

  async scrapp(url: string) {
    // TODO: CACHEAR URL
    // TODO: SACAR ESTA FAENA A TONI
    const response = await fetch(url);
    const data = await response.json();

    const fotocasaAdds: fotocasaAdd[] = data.realEstates;
    console.log('TOTAL ANUNCIOS fotocasaAdds: ', fotocasaAdds.length);
    const Raws: fotocasaAdd[] = plainToInstance(fotocasaAdd, fotocasaAdds);
    console.log('TOTAL ANUNCIOS plainToInstance: ', Raws.length);
    const Adds = Raws.map((R) => this.toAdd(R)).filter((a: any) => !!a);
    Adds.forEach((add) =>
      this.addService.add(add.provider + add.provider_id, add),
    );
  }

  toAdd(raw: fotocasaAdd): CreateAddDto {
    const F = raw.features.reduce<any>((p, v) => {
      p[v.key] = v.value[0];
      return p;
    }, {});
    const typologies = FotoToMetaTypology([raw.typeId, [raw.subtypeId]]);
    console.log(typologies);

    if (!typologies?.length) return;
    return {
      provider: Provider.fotocasa,
      provider_id: String(raw.id),
      url: 'https://fotocasa.es' + raw.detail.es,
      witness: undefined,
      property: plainToInstance(Property, {
        type: typologies[0],
        images: raw.multimedias.filter((m) => m.typeId === 2).map((m) => m.url),
        conservation: conservationToCode[F.conservationState],
        extraFeatures: mapExtraFeatureFromScrap(raw.features),
        surface: F.surface,
        bedrooms: F.rooms,
        bathrooms: F.bathrooms,
        rooms: undefined,
        floor: F.floor,
        price: raw.transactions.filter(
          (t) =>
            transactionCodeToCode[t.transactionTypeId] ===
            Transaction.compraventa,
        )[0]?.value[0],
        geo: {
          type: 'Point',
          coordinates: [
            raw.address.coordinates.longitude,
            raw.address.coordinates.latitude,
          ],
        },
      }),
    };
  }
}
