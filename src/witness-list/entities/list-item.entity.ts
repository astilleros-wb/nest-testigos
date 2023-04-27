import { Prop } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

export class ListItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'witnesses' })
  witness_id: ObjectId;

  @Prop()
  witness_version: number;

  @Prop()
  outdated: boolean;
}
