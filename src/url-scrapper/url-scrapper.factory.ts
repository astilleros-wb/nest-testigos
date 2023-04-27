import { Injectable } from '@nestjs/common';
import { FotocasaUrlScrapperService } from '../_providers/fotocasa/fotocasa-url-scrapper/fotocasa-url-scrapper.service';

@Injectable()
export class UrlScrapperFactory {
  constructor(
    private readonly fotocasaUrlScrapperService: FotocasaUrlScrapperService,
  ) {}

  async scrapp(url: string): Promise<void> {
    if (url.match(/fotocasa/gi))
      await this.fotocasaUrlScrapperService.scrapp(url);
    else throw new Error(`Scrapp error with url: ${url}`);
  }
}
