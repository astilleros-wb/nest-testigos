import { Module } from '@nestjs/common';
/* import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './entities/property.entity'; */

@Module({
  imports: [
    /*     
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]), 
    */
  ],
  providers: [],
})
export class PropertyModule {}
