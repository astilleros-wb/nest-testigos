import { WebSocketGateway } from '@nestjs/websockets';
import { CommonService } from './common.service';

@WebSocketGateway()
export class CommonGateway {
  constructor(private readonly commonService: CommonService) {}
}
