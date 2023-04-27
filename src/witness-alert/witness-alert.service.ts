import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWitnessAlertDto } from './dto/create-witness-alert.dto';
import { WitnessAlert } from './entities/witness-alert.entity';

@Injectable()
export class WitnessAlertService {
  constructor(
    @InjectModel(WitnessAlert.name)
    private readonly witnessAlertModel: Model<WitnessAlert>,
  ) {}
  async create(createWitnessAlertDto: CreateWitnessAlertDto) {
    return await this.witnessAlertModel.create(createWitnessAlertDto);
  }

  async createMany(createWitnessAlertDtos: CreateWitnessAlertDto[]) {
    return await this.witnessAlertModel.insertMany(createWitnessAlertDtos);
  }

  findAll() {
    return `This action returns all witnessAlert`;
  }
}
