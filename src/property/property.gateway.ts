import { WebSocketGateway } from '@nestjs/websockets';
import { PropertyService } from './property.service';

@WebSocketGateway()
export class PropertyGateway {
  constructor(private readonly propertyService: PropertyService) {}
}
