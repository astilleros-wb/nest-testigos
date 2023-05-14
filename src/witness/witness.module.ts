import { Module } from '@nestjs/common';
import { WitnessService } from './witness.service';
import { WitnessGateway } from './witness.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Witness, WitnessSchema } from './entities/witness.entity';
import { WitnessAlertModule } from 'src/witness-alert/witness-alert.module';
import { WitnessVersionModule } from 'src/witness-version/witness-version.module';
import { ImageCheckerModule } from 'src/image-checker/image-checker.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Witness.name, schema: WitnessSchema }]),
    WitnessVersionModule,
    WitnessAlertModule,
    ImageCheckerModule,
  ],
  providers: [WitnessGateway, WitnessService],
  exports: [WitnessService],
})
export class WitnessModule {}
