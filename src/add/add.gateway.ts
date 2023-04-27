import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AddService } from './add.service';

@WebSocketGateway()
export class AddGateway {}
