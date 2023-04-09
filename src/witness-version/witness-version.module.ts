import { Module } from '@nestjs/common';
import { WitnessVersionService } from './witness-version.service';
import { WitnessVersionGateway } from './witness-version.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WitnessVersion,
  WitnessVersionSchema,
} from './entities/witness-version.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WitnessVersion.name, schema: WitnessVersionSchema },
    ]),
  ],
  providers: [WitnessVersionGateway, WitnessVersionService],
})
export class WitnessVersionModule {}
