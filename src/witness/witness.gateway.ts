import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { WitnessService } from './witness.service';

@WebSocketGateway()
export class WitnessGateway {
  constructor(private readonly witnessService: WitnessService) {}
  /* 
  @SubscribeMessage('findAllWitness')
  findAll() {
    return this.witnessService.findAll();
  }

  @SubscribeMessage('findOneWitness')
  findOne(@MessageBody() id: number) {
    return this.witnessService.findOne(id);
  } */
}
