import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { AlertType } from '../../common/enums';

@Schema({ timestamps: true, versionKey: false })
export class WitnessAlert {
  @Prop({ type: () => mongoose.Schema.Types.ObjectId })
  witness?: ObjectId;

  @Prop()
  version: number;

  @Prop({ type: Number, enum: AlertType })
  type: AlertType;

  @Prop()
  old?: number;

  @Prop()
  current: number;
}

export const WitnessAlertSchema = SchemaFactory.createForClass(WitnessAlert);
