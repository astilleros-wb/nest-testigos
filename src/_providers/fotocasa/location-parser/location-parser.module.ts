import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MapRecord, MapRecordSchema } from './entities/map-record.entity';
import { LocationParserService } from './location-parser.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: MapRecord.name, schema: MapRecordSchema }])],
  providers: [LocationParserService],
  exports: [LocationParserService]
})
export class LocationParserModule {}
