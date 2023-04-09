import { Injectable } from '@nestjs/common';
import { CreateWitnessVersionDto } from './dto/create-witness-version.dto';
import { UpdateWitnessVersionDto } from './dto/update-witness-version.dto';

@Injectable()
export class WitnessVersionService {
  create(createWitnessVersionDto: CreateWitnessVersionDto) {
    return 'This action adds a new witnessVersion';
  }

  findAll() {
    return `This action returns all witnessVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} witnessVersion`;
  }

  update(id: number, updateWitnessVersionDto: UpdateWitnessVersionDto) {
    return `This action updates a #${id} witnessVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} witnessVersion`;
  }
}
