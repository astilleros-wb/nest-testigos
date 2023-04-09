import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataGateway } from './metadata.gateway';
import { UrlParserFactory } from './url-parser/url-parser-factory.factory';
import { FotocasaUrlParserModule } from 'src/_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.module';

@Module({
  imports: [FotocasaUrlParserModule],
  providers: [
    MetadataGateway, 
    MetadataService,
    UrlParserFactory,
  ]
})
export class MetadataModule {}
