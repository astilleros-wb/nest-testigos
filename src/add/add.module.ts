import { Module } from '@nestjs/common';
import { AddService } from './add.service';
import { AddGateway } from './add.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Add, AddSchema } from './entities/add.entity';
import { WitnessModule } from 'src/witness/witness.module';
import { WitnessVersionModule } from 'src/witness-version/witness-version.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Add.name, schema: AddSchema }]),
    WitnessModule,
    WitnessVersionModule,
    BullModule.registerQueue({
      name: 'AddScrappedQueue',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [AddGateway, AddService],
  exports: [AddService],
})
export class AddModule {}
