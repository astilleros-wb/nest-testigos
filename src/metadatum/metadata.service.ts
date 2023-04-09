import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { UrlParserFactory } from './url-parser/url-parser-factory.factory';

@Injectable()
export class MetadataService {

  constructor(
    private readonly urlParser: UrlParserFactory
  ){}
  async create(createMetadatumDto: CreateMetadatumDto) {
    const url = new URL(createMetadatumDto.url)
    if(url.protocol !== 'https:') throw `Invalid protocol ${url.protocol}`
    if(url.port) throw `Port not permited ${url.port}`
    if(url.username) throw `Username not permited ${url.username}`
    if(url.password) throw `Password not permited ${url.password}`
    const parser = await this.urlParser.getUrlParser(url)
    const metadata = await parser.parse(url)
    return metadata
  }

  findAll() {
    return `This action returns all metadata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metadatum`;
  }

  update(id: number, updateMetadatumDto: UpdateMetadatumDto) {
    return `This action updates a #${id} metadatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} metadatum`;
  }
}
