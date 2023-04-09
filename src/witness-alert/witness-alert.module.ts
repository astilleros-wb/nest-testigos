import { Module } from '@nestjs/common';
import { WitnessAlertService } from './witness-alert.service';
import { WitnessAlertGateway } from './witness-alert.gateway';
import { WitnessAlert, WitnessAlertSchema } from './entities/witness-alert.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WitnessAlert.name, schema: WitnessAlertSchema },
    ]),
  ],
  providers: [WitnessAlertGateway, WitnessAlertService]
})
export class WitnessAlertModule {}
