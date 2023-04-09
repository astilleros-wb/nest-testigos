import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Provider } from '../../common/enums';
import {
  Property,
  PropertySchema,
} from '../../property/entities/property.entity';

@Schema({ timestamps: true, versionKey: false })
export class AddVersion extends Document {
  @Prop({ type: Number, enum: Provider })
  provider: Provider;

  @Prop()
  provider_id: string;

  @Prop()
  url: string;

  @Prop({ type: () => mongoose.Schema.Types.ObjectId })
  witness: ObjectId;

  @Prop({ type: PropertySchema })
  property: Property;
}

export const AddVersionSchema = SchemaFactory.createForClass(AddVersion);
