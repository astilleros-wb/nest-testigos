import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { AddVersionService } from './add-version.service';
import { CreateAddVersionDto } from './dto/create-add-version.dto';
import { UpdateAddVersionDto } from './dto/update-add-version.dto';

@WebSocketGateway()
export class AddVersionGateway {
  constructor(private readonly addVersionService: AddVersionService) {}

  @SubscribeMessage('findAllAddVersion')
  findAll() {
    return this.addVersionService.findAll();
  }

  @SubscribeMessage('findOneAddVersion')
  findOne(@MessageBody() id: number) {
    return this.addVersionService.findOne(id);
  }

}
