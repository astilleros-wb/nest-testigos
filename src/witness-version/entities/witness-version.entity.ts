import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import {
  Property,
  PropertySchema,
} from '../../property/entities/property.entity';
import {
  WitnessAlert,
  WitnessAlertSchema,
} from '../../witness-alert/entities/witness-alert.entity';

@Schema({ timestamps: true, versionKey: false })
export class WitnessVersion {
  @Prop()
  version: number;

  @Prop({ type: PropertySchema })
  property: Property;

  @Prop({ type: [WitnessAlertSchema] })
  alerts: WitnessAlert[];

  @Prop({ type: () => [mongoose.Schema.Types.ObjectId] })
  adds: ObjectId[];
}

export const WitnessVersionSchema =
  SchemaFactory.createForClass(WitnessVersion);
