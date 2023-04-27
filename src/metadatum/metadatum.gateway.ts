import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { MetadatumService } from './metadatum.service';
import { urlDto } from './dto/url.dto';

@WebSocketGateway()
export class MetadatumGateway {
  constructor(private readonly metadatumService: MetadatumService) {}

  @SubscribeMessage('getMetadatumFromUrl')
  getMetadatumFromUrl(@MessageBody() urlDto: urlDto) {
    return this.metadatumService.getMetadatumFromUrl(urlDto);
  }
}
