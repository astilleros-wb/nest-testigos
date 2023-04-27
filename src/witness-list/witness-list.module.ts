import { Module } from '@nestjs/common';
import { WitnessListService } from './witness-list.service';
import { WitnessListGateway } from './witness-list.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { WitnessList, WitnessListSchema } from './entities/witness-list.entity';
import { WitnessModule } from 'src/witness/witness.module';
import { UrlGeneratorFactory } from 'src/url-generator/url-generator-factory.factory';
import { FotocasaUrlGeneratorService } from 'src/_providers/fotocasa/fotocasa-url-generator/fotocasa-url-generator.service';
import { UrlScrapperFactory } from 'src/url-scrapper/url-scrapper.factory';
import { FotocasaUrlScrapperService } from 'src/_providers/fotocasa/fotocasa-url-scrapper/fotocasa-url-scrapper.service';
import { FotocasaLocationParserModule } from 'src/_providers/fotocasa/fotocasa-location-parser/fotocasa-location-parser.module';
import { AddModule } from 'src/add/add.module';

@Module({
  providers: [
    WitnessListGateway,
    WitnessListService,
    UrlGeneratorFactory,
    FotocasaUrlGeneratorService,
    UrlScrapperFactory,
    FotocasaUrlScrapperService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: WitnessList.name, schema: WitnessListSchema },
    ]),
    WitnessModule,
    FotocasaLocationParserModule,
    AddModule,
  ],
})
export class WitnessListModule {}
