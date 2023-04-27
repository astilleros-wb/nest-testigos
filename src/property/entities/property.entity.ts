import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Typology, ExtraFeature, Conservation } from '../enums';
import { Point, Polygon, MultiPolygon } from '@turf/turf';

@Schema({ timestamps: false, versionKey: false })
export class Property {
  @Prop({ type: Number, enum: Typology })
  type: Typology;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: Number, enum: Conservation })
  conservation: Conservation;

  @Prop({ type: [{ type: Number, enum: [ExtraFeature] }], default: [] })
  extraFeatures: ExtraFeature[];

  @Prop()
  surface: number;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop()
  rooms: number;

  @Prop()
  floor: number;

  @Prop()
  price: number;

  @Prop({ type: Object, _id: false })
  geo: Point | Polygon | MultiPolygon;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
