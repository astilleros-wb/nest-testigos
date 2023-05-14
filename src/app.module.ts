import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './common/common.module';
import { MetadatumModule } from './metadatum/metadatum.module';
import { AddModule } from './add/add.module';
import { WitnessModule } from './witness/witness.module';
import { WitnessVersionModule } from './witness-version/witness-version.module';
import { WitnessAlertModule } from './witness-alert/witness-alert.module';
import { WitnessListModule } from './witness-list/witness-list.module';
import { PropertyModule } from './property/property.module';
import { FotocasaLocationParserModule } from './_providers/fotocasa/fotocasa-location-parser/fotocasa-location-parser.module';
import { FotocasaUrlParserModule } from './_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.module';

import { join } from 'path';
import { FotocasaUrlGeneratorService } from './_providers/fotocasa/fotocasa-url-generator/fotocasa-url-generator.service';
import { FotocasaUrlScrapperModule } from './_providers/fotocasa/fotocasa-url-scrapper/fotocasa-url-scrapper.module';
import { BullModule } from '@nestjs/bullmq';
import { AddScrappedWorker } from './add/add-scrapped.worker';
import { UrlParserModule } from './url-parser/url-parser.module';
import { UrlGeneratorModule } from './url-generator/url-generator.module';
import { UrlScrapperModule } from './url-scrapper/url-scrapper.module';
import { ImageCheckerModule } from './image-checker/image-checker.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    MetadatumModule,
    AddModule,
    WitnessModule,
    WitnessVersionModule,
    WitnessAlertModule,
    WitnessListModule,
    PropertyModule,
    FotocasaLocationParserModule,
    FotocasaUrlParserModule,
    FotocasaUrlScrapperModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UrlParserModule,
    UrlGeneratorModule,
    UrlScrapperModule,
    ImageCheckerModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [FotocasaUrlGeneratorService, AddScrappedWorker],
  exports: [BullModule],
})
export class AppModule {}
