import { Module } from '@nestjs/common';
import { FotocasaLocationParserModule } from '../fotocasa-location-parser/fotocasa-location-parser.module';
import { FotocasaUrlGeneratorService } from './fotocasa-url-generator.service';

@Module({
  providers: [FotocasaUrlGeneratorService],
  imports: [FotocasaLocationParserModule],
  exports: [FotocasaUrlGeneratorService],
})
export class FotocasaUrlGeneratorModule {}
