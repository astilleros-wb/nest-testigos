import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: false, versionKey: false, _id: false })
export class Range {
  @Prop()
  min?: number;

  @Prop()
  max?: number;

  @Prop()
  value?: number;
}

export const RangeSchema = SchemaFactory.createForClass(Range);
