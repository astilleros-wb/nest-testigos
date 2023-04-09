import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MetadataService } from './metadata.service';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';

@WebSocketGateway()
export class MetadataGateway {
  constructor(private readonly metadataService: MetadataService) {}

  @SubscribeMessage('createMetadatum')
  create(@MessageBody() createMetadatumDto: CreateMetadatumDto) {
    return this.metadataService.create(createMetadatumDto);
  }

}
