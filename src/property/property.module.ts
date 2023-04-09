import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyGateway } from './property.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './entities/property.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  providers: [PropertyGateway, PropertyService],
})
export class PropertyModule {}
