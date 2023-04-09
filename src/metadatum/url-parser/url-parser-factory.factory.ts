import { Injectable } from '@nestjs/common';
import { FotocasaUrlParserService } from '../../_providers/fotocasa/fotocasa-url-parser/fotocasa-url-parser.service';
import { URL } from 'url';
import { UrlParser } from './url-parser-factory.interface';

@Injectable()
export class UrlParserFactory {
  constructor(private   fotocasaUrlParserService: FotocasaUrlParserService) {}

  async getUrlParser(url: URL): Promise<UrlParser> {
    if (url.hostname?.match(/fotocasa/gi)) return this.fotocasaUrlParserService;
    throw new Error(`Hostname ${url.hostname} not implemented`);
  }
}
