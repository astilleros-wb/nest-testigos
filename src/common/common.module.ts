import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonGateway } from './common.gateway';
import { Geo } from './geo/geo';

@Module({
  providers: [CommonGateway, CommonService, Geo],
})
export class CommonModule {}
