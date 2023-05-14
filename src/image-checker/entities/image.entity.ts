import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  fingerprint: string;

  @Prop({ required: true, unique: true })
  url: string;

  @Prop({ type: () => mongoose.Schema.Types.ObjectId })
  witness: ObjectId;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
