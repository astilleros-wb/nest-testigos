import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Metadatum,
  MetadatumSchema,
} from 'src/metadatum/entities/metadatum.entity';
import { ListItem } from './list-item.entity';

@Schema({ timestamps: true, versionKey: false })
export class WitnessList {
  @Prop()
  name: string;

  @Prop()
  outdated: boolean;

  @Prop()
  keepTrack: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: MetadatumSchema })
  metadatum: Metadatum;

  @Prop()
  items: ListItem[];
}

export const WitnessListSchema = SchemaFactory.createForClass(WitnessList);

WitnessListSchema.index({ 'metadatum.geo': '2dsphere' });
