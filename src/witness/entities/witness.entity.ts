import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import {
  WitnessAlert,
  WitnessAlertSchema,
} from 'src/witness-alert/entities/witness-alert.entity';
import {
  Property,
  PropertySchema,
} from '../../property/entities/property.entity';

@Schema({ timestamps: true, versionKey: false })
export class Witness {
  @Prop()
  version: number;

  @Prop({ type: PropertySchema })
  property: Property;

  @Prop({ type: [WitnessAlertSchema] })
  alerts: WitnessAlert[];

  @Prop({ type: () => [mongoose.Schema.Types.ObjectId] })
  adds: ObjectId[];
}

export const WitnessSchema = SchemaFactory.createForClass(Witness);
