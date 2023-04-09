import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { AddAlertService } from './add-alert.service';

@WebSocketGateway()
export class AddAlertGateway {
  constructor(private readonly addAlertService: AddAlertService) {}

  @SubscribeMessage('findAllAddAlert')
  findAll() {
    return this.addAlertService.findAll();
  }

}
