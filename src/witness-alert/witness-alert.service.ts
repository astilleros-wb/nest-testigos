import { Injectable } from '@nestjs/common';
import { CreateWitnessAlertDto } from './dto/create-witness-alert.dto';
import { UpdateWitnessAlertDto } from './dto/update-witness-alert.dto';

@Injectable()
export class WitnessAlertService {
  create(createWitnessAlertDto: CreateWitnessAlertDto) {
    return 'This action adds a new witnessAlert';
  }

  findAll() {
    return `This action returns all witnessAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} witnessAlert`;
  }

  update(id: number, updateWitnessAlertDto: UpdateWitnessAlertDto) {
    return `This action updates a #${id} witnessAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} witnessAlert`;
  }
}
