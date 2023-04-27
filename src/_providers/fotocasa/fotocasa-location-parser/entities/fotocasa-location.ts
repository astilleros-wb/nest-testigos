import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MultiPolygon, Polygon } from '@turf/turf';
import { Document } from 'mongoose';

@Schema({ timestamps: false, versionKey: false })
export class FotocasaLocation extends Document {
  @Prop()
  readonly father: string;

  @Prop()
  readonly isParent: boolean;

  @Prop()
  readonly level: number;

  @Prop({ type: {} })
  readonly geo: Polygon | MultiPolygon;

  @Prop()
  readonly name: string;

  @Prop()
  readonly slug: string;

  @Prop()
  readonly encoded: string;
}

export const FotocasaLocationSchema =
  SchemaFactory.createForClass(FotocasaLocation);

FotocasaLocationSchema.index({ geo: '2dsphere' });
