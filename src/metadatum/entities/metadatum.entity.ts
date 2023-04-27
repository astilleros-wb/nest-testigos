import { Language, Transaction, UrlType, Provider } from '../../common/enums';
import { Typology, ExtraFeature, Conservation } from '../../property/enums';

import { Range, RangeSchema } from './range.entity';
import turf from '@turf/turf';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Metadatum {
  @Prop({ type: [Number], default: [] })
  providers?: Provider[];

  @Prop({ type: Number })
  urlType?: UrlType;

  @Prop()
  detailId?: string;

  @Prop({ type: [Number], default: [] })
  languages?: Language[];

  @Prop({ type: Number })
  transaction: Transaction;

  @Prop({ type: [Number], default: [] })
  typologies?: Typology[];

  @Prop({ type: [Number], default: [] })
  conservations?: Conservation[];

  @Prop({ type: [Number], default: [] })
  extraFeatures?: ExtraFeature[];

  @Prop({ type: RangeSchema })
  surface?: Range;

  @Prop({ type: RangeSchema })
  bedrooms?: Range;

  @Prop({ type: RangeSchema })
  bathrooms?: Range;

  @Prop({ type: RangeSchema })
  rooms?: Range;

  @Prop({ type: RangeSchema })
  price?: Range;

  @Prop({ type: Object })
  geo?: turf.Polygon | turf.MultiPolygon;
}

export const MetadatumSchema = SchemaFactory.createForClass(Metadatum);
