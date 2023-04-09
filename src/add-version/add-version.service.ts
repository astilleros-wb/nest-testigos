import { Injectable } from '@nestjs/common';
import { CreateAddVersionDto } from './dto/create-add-version.dto';
import { UpdateAddVersionDto } from './dto/update-add-version.dto';

@Injectable()
export class AddVersionService {
  create(createAddVersionDto: CreateAddVersionDto) {
    return 'This action adds a new addVersion';
  }

  findAll() {
    return `This action returns all addVersion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} addVersion`;
  }

  update(id: number, updateAddVersionDto: UpdateAddVersionDto) {
    return `This action updates a #${id} addVersion`;
  }

  remove(id: number) {
    return `This action removes a #${id} addVersion`;
  }
}
