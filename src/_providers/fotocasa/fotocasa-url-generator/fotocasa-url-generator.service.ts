import { Injectable } from '@nestjs/common';
import { MetadatumDto } from '../../../metadatum/dto/metadatum.dto';
import { FotocasaLocationService } from '../fotocasa-location-parser/fotocasa-location-parser.service';
import * as turf from '@turf/turf';
import {
  codeToConservation,
  codeToExtraFeatureNum,
  codeToLanguage,
  MetaToFotoTypologys,
} from '../enums';

@Injectable()
export class FotocasaUrlGeneratorService {
  constructor(
    private readonly fotocasaLocationService: FotocasaLocationService,
  ) {}

  async generate(md: MetadatumDto) {
    if (
      !md.urlType ||
      !md.transaction ||
      !md.typologies?.length ||
      !md.languages?.length
    )
      return [];

    const url = new URL(`https://web.gw.fotocasa.es/v2/propertysearch/search`);

    const featureIds = md.extraFeatures
      ?.map<string>((code: number) => String(codeToExtraFeatureNum[code]))
      .join(';');
    if (featureIds) url.searchParams.set('featureIds', featureIds);

    if (md.surface?.min)
      url.searchParams.set('minSurface', String(md.surface.min));
    if (md.surface?.max)
      url.searchParams.set('maxSurface', String(md.surface.max));

    if (md.price?.max) url.searchParams.set('maxPrice', String(md.price.max));
    if (md.price?.min) url.searchParams.set('minPrice', String(md.price.min));

    if (md.bedrooms?.min)
      url.searchParams.set('minRooms', String(md.bedrooms.min));
    if (md.bathrooms?.min)
      url.searchParams.set('minBathrooms', String(md.bathrooms.min));

    if (md.conservations?.length)
      url.searchParams.set(
        'conservationStatusIds',
        md.conservations
          .map<string>((code: number) => String(codeToConservation[code]))
          .join(';'),
      );

    if (md.languages?.length)
      url.searchParams.set('culture', codeToLanguage[md.languages[0]]);

    // TODO const transactions = codetoTransaction[md.transactions[0]]

    url.searchParams.set('transactionTypeId', '1');

    const propertyTypes = MetaToFotoTypologys(md.typologies, 'api');
    if (!propertyTypes.length) return [];
    console.log('generator propertyTypes', propertyTypes);

    url.searchParams.set('propertyTypeId', propertyTypes[0][0]);
    if (propertyTypes.length > 1)
      url.searchParams.set('propertySubtypeIds', propertyTypes[0][1].join(';'));

    if (!md.geo) throw new Error('Geometry required.');
    const centerOfMass = turf.centerOfMass(md.geo);
    url.searchParams.set(
      'latitude',
      String(centerOfMass.geometry.coordinates[1]),
    );
    url.searchParams.set(
      'longitude',
      String(centerOfMass.geometry.coordinates[0]),
    );

    let mapRecords;
    if (md.geo.type === 'Polygon')
      mapRecords = await this.fotocasaLocationService.polygonIntersect(
        md.geo,
        false,
      );
    else if (md.geo.type === 'MultiPolygon')
      mapRecords = await this.fotocasaLocationService.multyPolygonIntersect(
        md.geo,
        false,
      );
    else return [];
    const combinedLocationIds = mapRecords
      .map((r) => r.encoded.slice(5, r.encoded.length - 2).replace(/_/g, ','))
      .join(';');
    url.searchParams.set('combinedLocationIds', combinedLocationIds);

    // DEFAULTS
    url.searchParams.set('pageNumber', '1'); // TO DO
    url.searchParams.set('onlyCount', 'true');
    url.searchParams.set('size', '300');
    url.searchParams.set('platformId', '1');
    url.searchParams.set('sortOrderDesc', 'true');
    url.searchParams.set('sortType', 'scoring');
    url.searchParams.set('onlyCount', 'false');
    url.searchParams.set('isMap', 'false');
    url.searchParams.set('isNewConstructionPromotions', 'false');
    url.searchParams.set('isNewConstruction', 'false');
    url.searchParams.set('hrefLangCultures', 'ca-ES;es-ES;de-DE;en-GB');

    return [url.href];
  }
}
