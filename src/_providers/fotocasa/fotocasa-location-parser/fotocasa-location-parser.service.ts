import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

import * as turf from '@turf/turf';
import slugify from 'slugify';
import { FotocasaLocation } from './entities/fotocasa-location';
import { MultiPolygon, Polygon } from '@turf/turf';
import * as fs from 'fs/promises';
import { join } from 'path';
@Injectable()
export class FotocasaLocationService {
  constructor(
    @InjectModel(FotocasaLocation.name)
    private readonly fotocasaLocation: Model<FotocasaLocation>,
  ) {}
  

  intersections(
    feature: turf.Point | turf.Polygon | turf.MultiPolygon,
    isParent?: boolean,
  ) {
    switch (feature.type) {
      case 'Point':
        return this.pointIntersect(feature.coordinates);
      case 'Polygon':
        return this.polygonIntersect(feature, isParent);
      case 'MultiPolygon':
        return this.multyPolygonIntersect(feature, isParent);
    }
  }

  async pointIntersect(feature: turf.Position): Promise<FotocasaLocation[]> {
    const point = turf.point(feature);
    const records = await this.fotocasaLocation.find({
      geo: {
        $geoIntersects: {
          $geometry: point.geometry,
        },
      },
    });
    return records;
  }

  async polygonIntersect(
    feature: turf.Polygon,
    isParent?: boolean,
  ): Promise<FotocasaLocation[]> {
    const polygon = turf.polygon(feature.coordinates);
    let query: any = {
      geo: {
        $geoIntersects: {
          $geometry: polygon.geometry,
        },
      },
    };
    if (isParent !== undefined) query = { isParent, ...query };
    const results = await this.fotocasaLocation.find(query);
    const coverageFiltered = this.filterCoverage(polygon.geometry, results);
    return coverageFiltered;
  }

  async multyPolygonIntersect(
    feature: turf.MultiPolygon,
    isParent?: boolean,
  ): Promise<FotocasaLocation[]> {
    const multipolygon = turf.multiPolygon(feature.coordinates);
    let query: any = {
      geo: {
        $geoIntersects: {
          $geometry: multipolygon.geometry,
        },
      },
    };
    if (isParent !== undefined) query = { isParent, ...query };
    const results = await this.fotocasaLocation.find(query);
    const coverageFiltered = this.filterCoverage(
      multipolygon.geometry,
      results,
    );
    return coverageFiltered;
  }

  async findByEncoded(raw: string): Promise<FotocasaLocation[]> {
    const encoded = raw.replace(/,/g, '_');
    const results = await this.fotocasaLocation.find({
      encoded: new RegExp(encoded),
    });
    return results;
  }

  async findByName(name: string, type: 'city' | 'district') {
    const query: any = {
      slug: slugify(name),
    };
    if (type === 'city') query.level = { $lte: 4 };
    if (type === 'district') query.level = { $gte: 5 };

    const results = await this.fotocasaLocation.find(query);
    return results;
  }

  /* Clean geometries whitch coverage area is less than percentil. */
  filterCoverage(
    polygon: Polygon | MultiPolygon,
    geometries: FotocasaLocation[],
  ) {
    const polygon_area = turf.area(polygon);
    return geometries.filter((r) => {
      const intersection = turf.intersect(r.geo, polygon);
      if (!intersection) return false;
      const intersection_area = turf.area(intersection);
      const polyCoverage = intersection_area / polygon_area;
      return polyCoverage > 0.05;
    });
  }

  /* Restore fotocasa locations data. (TODO restructure)*/
  async checkSeed() {
    const count = await this.fotocasaLocation.count();
    if (count > 0) return;
    const buffer = await fs.readFile(join(process.cwd(), '/seed/fotocasa.json') );
    const json = JSON.parse(buffer.toString())
    const bson = json.map((doc:any) => {
      if(doc.geo.type === 'GeometryCollection' && doc.geo.geometries?.length === 1) {
        doc.geo = doc.geo.geometries[0]
      }
      if(doc.geo.type === 'GeometryCollection'){
        return undefined
      }
      const data : any = {
        ...doc,
        _id: new ObjectId(doc['$oid'])
      }
      return data
    })
    const cleaned = bson.filter((d) => !!d)
    const insert = await this.fotocasaLocation.collection.insertMany(cleaned);
    console.log('#SEED# Fotocasa locations: ', insert.acknowledged, insert.insertedCount);
  }
}
