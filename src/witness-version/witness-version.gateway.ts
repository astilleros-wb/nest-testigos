import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WitnessVersionService } from './witness-version.service';
import { CreateWitnessVersionDto } from './dto/create-witness-version.dto';
import { UpdateWitnessVersionDto } from './dto/update-witness-version.dto';

@WebSocketGateway()
export class WitnessVersionGateway {
  constructor(private readonly witnessVersionService: WitnessVersionService) {}

  @SubscribeMessage('findAllWitnessVersion')
  findAll() {
    return this.witnessVersionService.findAll();
  }

  @SubscribeMessage('findOneWitnessVersion')
  findOne(@MessageBody() id: number) {
    return this.witnessVersionService.findOne(id);
  }
}
