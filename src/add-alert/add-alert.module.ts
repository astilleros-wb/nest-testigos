import { Module } from '@nestjs/common';
import { AddAlertService } from './add-alert.service';
import { AddAlertGateway } from './add-alert.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AddAlert, AddAlertSchema } from './entities/add-alert.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AddAlert.name, schema: AddAlertSchema },
    ]),
  ],
  providers: [AddAlertGateway, AddAlertService]
})
export class AddAlertModule {}
