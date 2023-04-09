import { Module } from '@nestjs/common';
import { LocationParserModule } from '../location-parser/location-parser.module';
import { FotocasaUrlParserService } from './fotocasa-url-parser.service';

@Module({
  imports: [LocationParserModule],
  providers: [FotocasaUrlParserService],
  exports: [FotocasaUrlParserService],
})
export class FotocasaUrlParserModule {}
