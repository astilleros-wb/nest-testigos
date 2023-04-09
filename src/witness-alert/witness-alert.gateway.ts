import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WitnessAlertService } from './witness-alert.service';

@WebSocketGateway()
export class WitnessAlertGateway {
  constructor(private readonly witnessAlertService: WitnessAlertService) {}

  @SubscribeMessage('findAllWitnessAlert')
  findAll() {
    return this.witnessAlertService.findAll();
  }

}
