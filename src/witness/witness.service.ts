import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { centerOfMass } from '@turf/turf';
import { Model } from 'mongoose';
import { Add } from 'src/add/entities/add.entity';
import { AlertType } from 'src/common/enums';
import { MetadatumDto } from '../metadatum/dto/metadatum.dto';
import { Property } from 'src/property/entities/property.entity';
import { CreateWitnessAlertDto } from 'src/witness-alert/dto/create-witness-alert.dto';
import { WitnessAlert } from 'src/witness-alert/entities/witness-alert.entity';
import { WitnessAlertService } from 'src/witness-alert/witness-alert.service';
import { WitnessVersionService } from 'src/witness-version/witness-version.service';
import { CreateWitnessDto } from './dto/create-witness.dto';
import { UpdateWitnessDto } from './dto/update-witness.dto';
import { Witness } from './entities/witness.entity';

@Injectable()
export class WitnessService {
  constructor(
    @InjectModel(Witness.name)
    private readonly witnessModel: Model<Witness>,
    private readonly witnessVersionService: WitnessVersionService,
    private readonly witnessAlertService: WitnessAlertService,
  ) {}

  async findByMetadata(M: MetadatumDto): Promise<Witness[]> {
    if (!M.geo)
      throw new Error('Geometria requerida para la busqueda de testigos.');

    const q: any = {
      'property.geo': {
        $geoIntersects: {
          $geometry: M.geo,
        },
      },
    };

    if (M.typologies?.length) q['property.type'] = { $in: M.typologies };
    if (M.conservations?.length)
      q['property.conservation'] = { $in: M.conservations };
    if (M.extraFeatures?.length)
      q['property.extraFeatures'] = { $in: M.extraFeatures };
    if (M.surface) {
      q['property.surface'] = {};
      if (M.surface.min) q['property.surface']['$gte'] = M.surface.min;
      if (M.surface.max) q['property.surface']['$lte'] = M.surface.max;
      if (!Object.keys(q['property.surface']).length)
        delete q['property.surface'];
    }
    if (M.bedrooms) {
      q['property.bedrooms'] = {};
      if (M.bedrooms.min) q['property.bedrooms']['$gte'] = M.bedrooms.min;
      if (M.bedrooms.max) q['property.bedrooms']['$lte'] = M.bedrooms.max;
      if (!Object.keys(q['property.bedrooms']).length)
        delete q['property.bedrooms'];
    }
    if (M.bathrooms) {
      q['property.bathrooms'] = {};
      if (M.bathrooms.min) q['property.bathrooms']['$gte'] = M.bathrooms.min;
      if (M.bathrooms.max) q['property.bathrooms']['$lte'] = M.bathrooms.max;
      if (!Object.keys(q['property.bathrooms']).length)
        delete q['property.bathrooms'];
    }
    if (M.rooms) {
      q['property.rooms'] = {};
      if (M.rooms.min) q['property.rooms']['$gte'] = M.rooms.min;
      if (M.rooms.max) q['property.rooms']['$lte'] = M.rooms.max;
      if (!Object.keys(q['property.rooms']).length) delete q['property.rooms'];
    }
    if (M.price) {
      q['property.price'] = {};
      if (M.price.min) q['property.price']['$gte'] = M.price.min;
      if (M.price.max) q['property.price']['$lte'] = M.price.max;
      if (!Object.keys(q['property.price']).length) delete q['property.price'];
    }

    console.log(q);

    const witnesses = await this.witnessModel.find(q);

    console.log('findByMetadata length', witnesses.length);

    return witnesses;
  }

  async insert(W: CreateWitnessDto): Promise<Witness> {
    const witness = await this.witnessModel.create(W);
    if (!witness) throw new Error('Cant insert witness.');
    return witness;
  }

  async update(W: UpdateWitnessDto): Promise<Witness> {
    const set_data = W;
    set_data.version = set_data.version + 1;
    const updated = await this.witnessModel.findOneAndUpdate(
      {
        _id: W._id,
        version: W.version,
      },
      { $set: set_data },
      { returnDocument: 'before' },
    );
    if (!updated) throw new Error('Witness to update not found.');
    // TODO
    //await this.witnessVersions.create(updated);
    return updated;
  }

  async upsertWitnessFromNewAdd(add: Add): Promise<Witness> {
    console.log('upsertWitnessFromNewAdd');

    const witness = await this.duplicatedByProperty(add.property);
    //console.log(witness);

    if (witness) {
      await this.mergeAdd(witness, add);
      const updated = await this.update(witness.toObject());
      console.log('duplicated witness - ', updated._id);
      return updated;
    }

    return await this.insert({
      version: 0,
      property: add.property,
      alerts: [],
      adds: [add._id],
    });
  }

  async upsertWitnessFromOldAdd(add: Add): Promise<Witness> {
    const witness = await this.witnessModel.findOne({
      _id: add.witness,
    });
    if (!witness) throw new Error('related witness not found');
    console.log('related witness - ', witness._id);
    await this.mergeAdd(witness, add);
    return await this.update(witness.toObject());
  }

  async duplicatedByProperty(property: Property) {
    try {
      const q: any = {
        'property.geo': {
          $near: {
            $geometry: centerOfMass(property.geo).geometry,
            $maxDistance: 300,
          },
        },
      };
      property.type ? (q['property.type'] = property.type) : undefined;
      property.price ? (q['property.price'] = property.price) : undefined;
      property.surface ? (q['property.surface'] = property.surface) : undefined;
      property.bedrooms
        ? (q['property.bedrooms'] = property.bedrooms)
        : undefined;
      property.bathrooms
        ? (q['property.bathrooms'] = property.bathrooms)
        : undefined;
      console.log('duplicatedByProperty query ', q);

      const info_duplicated = await this.witnessModel.findOne(q);
      return info_duplicated;
    } catch (error) {
      console.log(error);
    }
  }

  async mergeAdd(witness: Witness, add: Add) {
    const alerts: WitnessAlert[] = [];

    if (!witness.adds.some((add_id) => add_id === add._id)) {
      witness.adds.push(add._id);
      const alert = await this.witnessAlertService.create({
        type: AlertType.newAdd,
        current: witness.alerts.length + 1,
        witness: witness._id,
        version: 1 + witness.version,
      });
      alerts.push(alert);
    }

    const { property, propertyAlerts } = await this.mergeWitnessProperties(
      witness,
      add,
    );
    witness.property = property;
    alerts.push(...propertyAlerts);
    witness.alerts = alerts;
  }

  async mergeWitnessProperties(
    a: Witness,
    b: Add,
  ): Promise<{
    property: Property;
    propertyAlerts: WitnessAlert[];
  }> {
    const toInsert: CreateWitnessAlertDto[] = [];
    // surface
    if (!a.property.surface && b.property.surface) {
      a.property.surface = b.property.surface;
      toInsert.push({
        type: AlertType.surface,
        current: b.property.surface,
        witness: a._id,
        version: 1 + a.version,
      });
    } else if (
      a.property.surface &&
      a.property.surface !== b.property.surface
    ) {
      a.property.surface = b.property.surface;
      toInsert.push({
        type: AlertType.surface,
        old: a.property.surface,
        current: b.property.surface,
        witness: a._id,
        version: 1 + a.version,
      });
    }

    // price
    if (!a.property.price && b.property.price) {
      a.property.price = b.property.price;
      toInsert.push({
        type: AlertType.price,
        current: b.property.price,
        witness: a._id,
        version: 1 + a.version,
      });
    } else if (a.property.price && a.property.price !== b.property.price) {
      a.property.price = b.property.price;
      toInsert.push({
        type: AlertType.price,
        old: a.property.price,
        current: b.property.price,
        witness: a._id,
        version: 1 + a.version,
      });
    }

    // bedrooms
    if (!a.property.bedrooms && b.property.bedrooms) {
      a.property.bedrooms = b.property.bedrooms;
      toInsert.push({
        type: AlertType.bedrooms,
        current: b.property.bedrooms,
        witness: a._id,
        version: 1 + a.version,
      });
    } else if (
      a.property.bedrooms &&
      a.property.bedrooms !== b.property.bedrooms
    ) {
      a.property.bedrooms = b.property.bedrooms;
      toInsert.push({
        type: AlertType.bedrooms,
        old: a.property.bedrooms,
        current: b.property.bedrooms,
        witness: a._id,
        version: 1 + a.version,
      });
    }

    // bathrooms
    if (!a.property.bathrooms && b.property.bathrooms) {
      a.property.bathrooms = b.property.bathrooms;
      toInsert.push({
        type: AlertType.bathrooms,
        current: b.property.bathrooms,
        witness: a._id,
        version: 1 + a.version,
      });
    } else if (
      a.property.bathrooms &&
      a.property.bathrooms !== b.property.bathrooms
    ) {
      a.property.bathrooms = b.property.bathrooms;
      toInsert.push({
        type: AlertType.bathrooms,
        old: a.property.bathrooms,
        current: b.property.bathrooms,
        witness: a._id,
        version: 1 + a.version,
      });
    }

    const propertyAlerts = await this.witnessAlertService.createMany(toInsert);

    return { property: a.property, propertyAlerts };
  }
}
