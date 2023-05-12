import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property } from 'src/property/entities/property.entity';
import { WitnessService } from 'src/witness/witness.service';
import { CreateAddDto } from './dto/create-add.dto';
import { Add } from './entities/add.entity';
import { plainToInstance } from 'class-transformer';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AddService {
  constructor(
    @InjectModel(Add.name)
    private readonly addModel: Model<Add>,
    private readonly witnessService: WitnessService,
    @InjectQueue('AddScrappedQueue') private addScrappedQueue: Queue,
  ) {}

  /* Se llama por cada anuncio que viene del scrapper */
  async upsertFromScrapper(add: CreateAddDto): Promise<Add> {
    //console.log('AddService@upsertFromScrapper');
    const exist = await this.addModel.findOne({
      provider: add.provider,
      provider_id: add.provider_id,
    });
    //console.log('exist ', exist?._id);
    if (!exist) return await this.newAdd(add);
    return await this.updateAdd(exist, add);
  }

  async newAdd(createAddDto: CreateAddDto): Promise<Add> {
    //console.log('AddService@newAdd', createAddDto);

    const add = await this.addModel.create(createAddDto);

    console.log('add', add?._id);
    if (!add) throw new Error('Error trying to create new add.');

    const witness = await this.witnessService.upsertWitnessFromNewAdd(add);

    await this.addModel.updateOne(
      { _id: add._id },
      { $set: { witness: witness._id } },
    );

    add.witness = witness._id;
    return add;
  }

  async updateAdd(exist: Add, add: CreateAddDto): Promise<Add> {
    const { property, alerts } = this.mergeAddProperties(
      exist.property,
      add.property,
    );
    exist.property = property;
    const update = await this.addModel.findOneAndUpdate(
      { _id: exist._id },
      { $set: exist },
      { returnDocument: 'after' },
    );
    if (!update) throw new Error('Cant update fotocasa add.');
    console.log('update add - ', update._id);

    if (alerts) await this.witnessService.upsertWitnessFromOldAdd(update);

    return update;
  }

  mergeAddProperties(a: Property, b: Property) {
    return {
      property: plainToInstance(Property, { ...a, ...b }),
      alerts: (!a.price && !!b.price) || (a.price && a.price !== b.price),
    };
  }

  add(name: string, add: any) {
    this.addScrappedQueue.add(name, add);
  }
}
