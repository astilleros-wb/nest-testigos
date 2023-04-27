import { Module } from '@nestjs/common';
import { FotocasaLocationParserModule } from '../fotocasa-location-parser/fotocasa-location-parser.module';
import { FotocasaUrlParserService } from './fotocasa-url-parser.service';

@Module({
  imports: [FotocasaLocationParserModule, FotocasaLocationParserModule],
  providers: [FotocasaUrlParserService],
  exports: [FotocasaUrlParserService],
})
export class FotocasaUrlParserModule {}
