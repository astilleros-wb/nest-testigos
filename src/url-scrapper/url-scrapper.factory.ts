import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { FotocasaUrlScrapperService } from '../_providers/fotocasa/fotocasa-url-scrapper/fotocasa-url-scrapper.service';

@Injectable()
export class UrlScrapperFactory {
  constructor(
    private readonly fotocasaUrlScrapperService: FotocasaUrlScrapperService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async scrapp(url: string): Promise<void> {
    const cached = await this.cacheManager.get(url);
    if (cached) {
      console.log('Url cacheada ', url);
      return;
    }
    if (url.match(/fotocasa/gi))
      await this.fotocasaUrlScrapperService.scrapp(url);

    return await this.cacheManager.set(url, true, 60000);
  }
}
