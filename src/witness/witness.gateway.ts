import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WitnessService } from './witness.service';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';

@WebSocketGateway()
export class WitnessGateway {
  constructor(private readonly witnessService: WitnessService) {}

  @SubscribeMessage('findAllWitness')
  findAll() {
    return this.witnessService.findAll();
  }

  @SubscribeMessage('findOneWitness')
  findOne(@MessageBody() id: number) {
    return this.witnessService.findOne(id);
  }

}
