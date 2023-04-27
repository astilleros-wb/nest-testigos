import { Module } from '@nestjs/common';
import { FotocasaUrlScrapperModule } from 'src/_providers/fotocasa/fotocasa-url-scrapper/fotocasa-url-scrapper.module';
import { UrlScrapperFactory } from './url-scrapper.factory';

@Module({
  imports: [UrlScrapperModule, FotocasaUrlScrapperModule],
  providers: [UrlScrapperFactory],
})
export class UrlScrapperModule {}
