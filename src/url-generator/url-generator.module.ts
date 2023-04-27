import { Module } from '@nestjs/common';
import { FotocasaUrlGeneratorModule } from 'src/_providers/fotocasa/fotocasa-url-generator/fotocasa-url-generator.module';
import { UrlGeneratorFactory } from './url-generator-factory.factory';

@Module({
  imports: [FotocasaUrlGeneratorModule],
  providers: [UrlGeneratorFactory],
})
export class UrlGeneratorModule {}
