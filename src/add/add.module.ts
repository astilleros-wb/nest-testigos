import { Module } from '@nestjs/common';
import { AddService } from './add.service';
import { AddGateway } from './add.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Add, AddSchema } from './entities/add.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Add.name, schema: AddSchema }])],
  providers: [AddGateway, AddService]
})
export class AddModule {}
