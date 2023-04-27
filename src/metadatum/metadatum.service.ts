import { Injectable } from '@nestjs/common';
import { urlDto } from './dto/url.dto';
import { UrlParserFactory } from '../url-parser/url-parser-factory.factory';

@Injectable()
export class MetadatumService {
  constructor(private readonly urlParser: UrlParserFactory) {}
  async getMetadatumFromUrl(urlDto: urlDto) {
    const url = new URL(urlDto.url);
    if (url.protocol !== 'https:') throw `Invalid protocol ${url.protocol}`;
    if (url.port) throw `Port not permited ${url.port}`;
    if (url.username) throw `Username not permited ${url.username}`;
    if (url.password) throw `Password not permited ${url.password}`;
    const parser = await this.urlParser.getUrlParser(url);
    const metadatum = await parser.parse(url);
    return metadatum;
  }
}
