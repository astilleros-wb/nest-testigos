import { Module } from '@nestjs/common';
import { WitnessListService } from './witness-list.service';
import { WitnessListGateway } from './witness-list.gateway';

@Module({
  providers: [WitnessListGateway, WitnessListService]
})
export class WitnessListModule {}
