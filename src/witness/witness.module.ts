import { Module } from '@nestjs/common';
import { WitnessService } from './witness.service';
import { WitnessGateway } from './witness.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Witness, WitnessSchema } from './entities/witness.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Witness.name, schema: WitnessSchema },
    ]),
  ],
  providers: [WitnessGateway, WitnessService]
})
export class WitnessModule {}
