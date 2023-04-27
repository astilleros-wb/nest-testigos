import { Injectable } from '@nestjs/common';
import { Metadatum } from 'src/metadatum/entities/metadatum.entity';
import {
  conservationToCode,
  ExtraFeatureNumToCode,
  ExtraFeaturetrToCode,
  FotoToMetaTypology,
  languageToCode,
  transactionToCode,
  typeToCode,
  UrlTypeFotocasa,
} from '../enums';
import { FotocasaLocation } from '../fotocasa-location-parser/entities/fotocasa-location';
import { FotocasaLocationService } from '../fotocasa-location-parser/fotocasa-location-parser.service';
import * as turf from '@turf/turf';
import { Provider } from '../../../common/enums';
import { UrlParser } from '../../../url-parser/url-parser-factory.interface';

@Injectable()
export class FotocasaUrlParserService implements UrlParser {
  constructor(
    private readonly locationParserService: FotocasaLocationService,
  ) {}

  async parse(url: URL): Promise<object> {
    const md: any = {};
    console.log(url.hostname);

    md.providers = [Provider.fotocasa];

    const [language, transaction, propertyType, city, ...data] = url.pathname
      .slice(1)
      .split('/');

    if (!data.length) throw 'Url not recognized.';

    const locations: any = {
      decoded: [city],
      encoded: undefined,
    };

    const type = data[data.length - 1];
    md.urlType = typeToCode[type];
    if (!md.urlType) throw 'type not recognized.';

    md.languages = [languageToCode[language]];
    if (!md.languages.length) throw 'language not recognized.';

    md.transaction = transactionToCode[transaction];
    console.log(md.transaction);
    if (md.transaction === undefined) throw 'transaction not recognized.';

    md.typologies = FotoToMetaTypology(propertyType);
    if (!md.typologies?.length) throw 'Typologies not recognized.';

    if (type == UrlTypeFotocasa.list) {
      if (data[0] !== 'todas-las-zonas') {
        locations.decoded?.push(data[0]);
      }

      const combinedLocationIds = url.searchParams.get('combinedLocationIds');
      if (combinedLocationIds) {
        locations.encoded = combinedLocationIds.split(';');
      }

      if (url.searchParams.has('featureIds')) {
        md.extraFeatures = url.searchParams
          .get('featureIds')
          ?.split(';')
          .map((id: string) => ExtraFeatureNumToCode[Number(id)]);
      }
      if (url.searchParams.has('minSurface')) {
        if (!md.surface) md.surface = {};
        md.surface.min = Number(url.searchParams.get('minSurface'));
      }
      if (url.searchParams.has('maxSurface')) {
        if (!md.surface) md.surface = {};
        md.surface.max = Number(url.searchParams.get('maxSurface'));
      }
      if (url.searchParams.has('minPrice')) {
        if (!md.price) md.price = {};
        md.price.min = Number(url.searchParams.get('minPrice'));
      }
      if (url.searchParams.has('maxPrice')) {
        if (!md.price) md.price = {};
        md.price.max = Number(url.searchParams.get('maxPrice'));
      }
      if (url.searchParams.has('minRooms')) {
        if (!md.bedrooms) md.bedrooms = {};
        md.bedrooms.min = Number(url.searchParams.get('minRooms'));
      }
      if (url.searchParams.has('minBathrooms')) {
        if (!md.bathrooms) md.bathrooms = {};
        md.bathrooms.min = Number(url.searchParams.get('minBathrooms'));
      }
      if (url.searchParams.has('conservationStatusIds')) {
        const conservations = url.searchParams
          .get('conservationStatusIds')
          ?.split(';')
          .map((str: string) => Number(str));
        if (conservations?.length) {
          md.conservations = [];
          for (let i = 0; i < conservations.length; i++) {
            const status = conservations[i];
            if (
              conservationToCode[status] ||
              conservationToCode[status] === 0
            ) {
              md.conservations = [
                ...md.conservations,
                conservationToCode[status],
              ];
            }
          }
        }
      }
    } else {
      const extraFeatures = data[0].split('-');
      md.extraFeatures = [];
      for (let i = 0; i < extraFeatures.length; i++) {
        const feature = extraFeatures[i];
        if (ExtraFeaturetrToCode[feature]) {
          md.extraFeatures = [
            ...md.extraFeatures,
            ExtraFeaturetrToCode[feature],
          ];
        } else {
          if (!(i + 1 < extraFeatures.length)) break;
          const key = extraFeatures[i] + '-' + extraFeatures[i + 1];
          if (ExtraFeaturetrToCode[key] || ExtraFeaturetrToCode[key] === 0) {
            md.extraFeatures = [...md.extraFeatures, ExtraFeaturetrToCode[key]];
            i++;
          }
        }
      }

      md.detailId = data[1];
    }
    await this.matchLocations(md, locations);
    return md;
  }

  async matchLocations(md: Metadatum, locations: any) {
    if (!locations) return;

    const all_geos: turf.Geometries[] = [];

    if (locations.encoded) {
      const geoFeatures = await Promise.all(
        locations.encoded.map((encoded: string) =>
          this.locationParserService.findByEncoded(encoded),
        ),
      );
      for (let i = 0; i < geoFeatures.length; i++) {
        const Geo = geoFeatures[i];
        for (let j = 0; j < Geo.length; j++) {
          const FotocasaRecord = Geo[j];
          all_geos.push(FotocasaRecord.geo);
        }
      }
    } else if (locations.decoded?.length) {
      const city_slug = locations.decoded[0];
      const city = await this.locationParserService.findByName(
        city_slug,
        'city',
      );

      const district_slug =
        locations.decoded.length == 2 ? locations.decoded[1] : undefined;
      let district: FotocasaLocation[] | undefined;
      if (district_slug) {
        district = await this.locationParserService.findByName(
          district_slug,
          'district',
        );
      }

      if (district) all_geos.push(district[0].geo);
      else if (city) all_geos.push(city[0].geo);
    }
    let union;
    for (let i = 0; i < all_geos.length; i++) {
      const geo = all_geos[i];
      if (geo.type !== 'Polygon' && geo.type !== 'MultiPolygon') continue;
      const aux =
        geo.type === 'Polygon'
          ? turf.polygon(geo.coordinates)
          : turf.multiPolygon(geo.coordinates);
      if (!union) union = aux;
      else union = turf.union(union, aux);
    }
    if (union) md.geo = union.geometry;
  }
}
