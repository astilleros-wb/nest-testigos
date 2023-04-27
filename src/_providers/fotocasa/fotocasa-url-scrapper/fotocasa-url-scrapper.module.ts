import { Module } from '@nestjs/common';
import { AddModule } from 'src/add/add.module';
import { FotocasaUrlScrapperService } from './fotocasa-url-scrapper.service';

@Module({
  imports: [AddModule],
  providers: [FotocasaUrlScrapperService],
  exports: [FotocasaUrlScrapperService],
})
export class FotocasaUrlScrapperModule {}
