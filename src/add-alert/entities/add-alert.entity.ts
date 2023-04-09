import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { NotificationType } from '../../common/enums';

@Schema({ timestamps: true, versionKey: false })
export class AddAlert {
  @Prop({ type: () => mongoose.Schema.Types.ObjectId })
  witness?: ObjectId;

  @Prop()
  version: number;

  @Prop({ type: Number, enum: NotificationType })
  type: NotificationType;

  @Prop()
  old?: number;

  @Prop()
  current: number;
}

export const AddAlertSchema = SchemaFactory.createForClass(AddAlert);