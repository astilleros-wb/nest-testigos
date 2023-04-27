import { Module } from '@nestjs/common';
import { FotocasaLocationParserModule } from 'src/_providers/fotocasa/fotocasa-location-parser/fotocasa-location-parser.module';
import { FotocasaUrlParserModule } from 'src/_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.module';
import { UrlParserFactory } from './url-parser-factory.factory';

@Module({
  imports: [FotocasaUrlParserModule, FotocasaLocationParserModule],
  providers: [UrlParserFactory],
  exports: [UrlParserFactory],
})
export class UrlParserModule {}
