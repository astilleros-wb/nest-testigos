import { Injectable } from '@nestjs/common';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';

@Injectable()
export class WitnessService {
  create(createWitnessDto: CreateWitnessDto) {
    return 'This action adds a new witness';
  }

  findAll() {
    return `This action returns all witness`;
  }

  findOne(id: number) {
    return `This action returns a #${id} witness`;
  }

  update(id: number, updateWitnessDto: UpdateWitnessDto) {
    return `This action updates a #${id} witness`;
  }

  remove(id: number) {
    return `This action removes a #${id} witness`;
  }
}
