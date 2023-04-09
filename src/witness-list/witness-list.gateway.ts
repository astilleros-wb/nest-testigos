import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WitnessListService } from './witness-list.service';
import { CreateWitnessListDto } from './dto/create-witness-list.dto';
import { UpdateWitnessListDto } from './dto/update-witness-list.dto';

@WebSocketGateway()
export class WitnessListGateway {
  constructor(private readonly witnessListService: WitnessListService) {}

  @SubscribeMessage('createWitnessList')
  create(@MessageBody() createWitnessListDto: CreateWitnessListDto) {
    return this.witnessListService.create(createWitnessListDto);
  }

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
    return this.witnessListService.update(updateWitnessListDto.id, updateWitnessListDto);
  }

  @SubscribeMessage('removeWitnessList')
  remove(@MessageBody() id: number) {
    return this.witnessListService.remove(id);
  }
}
