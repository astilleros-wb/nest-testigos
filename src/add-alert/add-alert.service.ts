import { Injectable } from '@nestjs/common';
import { CreateAddAlertDto } from './dto/create-add-alert.dto';
import { UpdateAddAlertDto } from './dto/update-add-alert.dto';

@Injectable()
export class AddAlertService {
  create(createAddAlertDto: CreateAddAlertDto) {
    return 'This action adds a new addAlert';
  }

  findAll() {
    return `This action returns all addAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addAlert`;
  }

  update(id: number, updateAddAlertDto: UpdateAddAlertDto) {
    return `This action updates a #${id} addAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} addAlert`;
  }
}
