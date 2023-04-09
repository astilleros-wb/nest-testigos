import { Module } from '@nestjs/common';
import { AddVersionService } from './add-version.service';
import { AddVersionGateway } from './add-version.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AddVersion, AddVersionSchema } from './entities/add-version.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: AddVersion.name, schema: AddVersionSchema }])],
  providers: [AddVersionGateway, AddVersionService]
})
export class AddVersionModule {}
