import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AddService } from './add.service';

@WebSocketGateway()
export class AddGateway {
  constructor(private readonly addService: AddService) {}

  @SubscribeMessage('findAllAdd')
  findAll() {
    return this.addService.findAll();
  }

  @SubscribeMessage('findOneAdd')
  findOne(@MessageBody() id: number) {
    return this.addService.findOne(id);
  }

}
