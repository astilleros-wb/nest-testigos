import { Injectable } from '@nestjs/common';
import { CreateWitnessListDto } from './dto/create-witness-list.dto';
import { UpdateWitnessListDto } from './dto/update-witness-list.dto';

@Injectable()
export class WitnessListService {
  create(createWitnessListDto: CreateWitnessListDto) {
    return 'This action adds a new witnessList';
  }

  findAll() {
    return `This action returns all witnessList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} witnessList`;
  }

  update(id: number, updateWitnessListDto: UpdateWitnessListDto) {
    return `This action updates a #${id} witnessList`;
  }

  remove(id: number) {
    return `This action removes a #${id} witnessList`;
  }
}
