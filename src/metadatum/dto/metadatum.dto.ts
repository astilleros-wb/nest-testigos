import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, Length, IsObject } from 'class-validator';
import { UrlType, Language, Transaction, Provider } from 'src/common/enums';
import { Conservation, ExtraFeature, Typology } from 'src/property/enums';
import turf from '@turf/turf';
import { Range } from '../entities/range.entity';

export class MetadatumDto {
  @IsArray()
  @IsEnum(Provider)
  providers?: Provider[];

  @IsEnum(UrlType)
  urlType?: UrlType;

  @IsString()
  @Length(1)
  detailId?: string;

  @IsArray()
  @IsEnum(Language)
  languages?: Language[];

  @IsEnum(Transaction)
  transaction?: Transaction;

  @IsArray()
  @IsEnum(Typology)
  typologies?: Typology[];

  @IsArray()
  @IsEnum(Conservation)
  conservations?: Conservation[];

  @IsArray()
  @IsEnum(ExtraFeature)
  extraFeatures?: ExtraFeature[];

  @IsObject()
  @Type(() => Range)
  surface?: Range;

  @IsObject()
  @Type(() => Range)
  bedrooms?: Range;

  @IsObject()
  @Type(() => Range)
  bathrooms?: Range;

  @IsObject()
  @Type(() => Range)
  rooms?: Range;

  @IsObject()
  @Type(() => Range)
  price?: Range;

  @IsArray()
  geo?: turf.Polygon | turf.MultiPolygon;
}
