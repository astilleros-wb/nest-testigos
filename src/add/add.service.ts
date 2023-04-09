import { Injectable } from '@nestjs/common';
import { CreateAddDto } from './dto/create-add.dto';
import { UpdateAddDto } from './dto/update-add.dto';

@Injectable()
export class AddService {
  create(createAddDto: CreateAddDto) {
    return 'This action adds a new add';
  }

  findAll() {
    return `This action returns all add`;
  }

  findOne(id: number) {
    return `This action returns a #${id} add`;
  }

  update(id: number, updateAddDto: UpdateAddDto) {
    return `This action updates a #${id} add`;
  }

  remove(id: number) {
    return `This action removes a #${id} add`;
  }
}
