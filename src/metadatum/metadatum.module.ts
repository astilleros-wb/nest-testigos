import { Module } from '@nestjs/common';
import { MetadatumService } from './metadatum.service';
import { MetadatumGateway } from './metadatum.gateway';
import { UrlParserFactory } from 'src/url-parser/url-parser-factory.factory';
import { FotocasaUrlParserService } from 'src/_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.service';
import { FotocasaLocationParserModule } from 'src/_providers/fotocasa/fotocasa-location-parser/fotocasa-location-parser.module';

@Module({
  imports: [FotocasaLocationParserModule],
  providers: [
    MetadatumGateway,
    MetadatumService,
    UrlParserFactory,
    FotocasaUrlParserService,
  ],
})
export class MetadatumModule {}
