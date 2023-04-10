import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from './common/common.module';
import { MetadataModule } from './metadatum/metadata.module';
import { AddModule } from './add/add.module';
import { AddVersionModule } from './add-version/add-version.module';
import { AddAlertModule } from './add-alert/add-alert.module';
import { WitnessModule } from './witness/witness.module';
import { WitnessVersionModule } from './witness-version/witness-version.module';
import { WitnessAlertModule } from './witness-alert/witness-alert.module';
import { WitnessListModule } from './witness-list/witness-list.module';
import { PropertyModule } from './property/property.module';
import { FotocasaLocationParserModule } from './_providers/fotocasa/fotocasa-location-parser/fotocasa-location-parser.module';
import { FotocasaUrlParserModule } from './_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.module';

import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodbUri'),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    MetadataModule,
    AddModule,
    AddVersionModule,
    AddAlertModule,
    WitnessModule,
    WitnessVersionModule,
    WitnessAlertModule,
    WitnessListModule,
    PropertyModule,
    FotocasaLocationParserModule,
    FotocasaUrlParserModule,
  ],
})
export class AppModule {}
