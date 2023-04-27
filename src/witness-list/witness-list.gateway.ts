import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WitnessListService } from './witness-list.service';
import { MetadatumDto } from 'src/metadatum/dto/metadatum.dto';

@WebSocketGateway()
export class WitnessListGateway {
  constructor(private readonly witnessListService: WitnessListService) {}
  @SubscribeMessage('generateListFromMetadatum')
  generateListFromMetadatum(@MessageBody() metadatumDto: MetadatumDto) {
    return this.witnessListService.generateListFromMetadatum(metadatumDto);
  }

  /* 
  @SubscribeMessage('findAllWitnessList')
  findAll() {
    return this.witnessListService.findAll();
  }

  @SubscribeMessage('findOneWitnessList')
  findOne(@MessageBody() id: number) {
    return this.witnessListService.findOne(id);
  }

  @SubscribeMessage('updateWitnessList')
  update(@MessageBody() updateWitnessListDto: UpdateWitnessListDto) {
    return this.witnessListService.update(
      updateWitnessListDto.id,
      updateWitnessListDto,
    );
  }

  @SubscribeMessage('removeWitnessList')
  remove(@MessageBody() id: number) {
    return this.witnessListService.remove(id);
  } */
}
