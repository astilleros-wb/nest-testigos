import { Injectable } from '@nestjs/common';
import * as turf from '@turf/turf'
import slugify from "slugify";
import { MapRecord } from './entities/map-record.entity';
import { MultiPolygon, Polygon } from "@turf/turf";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationParserService {
  constructor(
    @InjectModel( MapRecord.name )
    private readonly mapRecord: Model<MapRecord>
    ){}
    
    intersections(feature: turf.Point | turf.Polygon | turf.MultiPolygon, isParent?: boolean ) {
      switch (feature.type) {
          case 'Point':
              return this.pointIntersect(feature.coordinates)
          case 'Polygon':
              return this.polygonIntersect(feature, isParent)
          case 'MultiPolygon':
              return this.multyPolygonIntersect(feature, isParent)
      }
  }

  async pointIntersect(feature: turf.Position): Promise<MapRecord[]> {
      const point = turf.point(feature)
      const records = await this.mapRecord.find({
          geo: {
              $geoIntersects: {
                  $geometry: point.geometry
              }
          }
      })
      return records
  }

  async polygonIntersect(feature: turf.Polygon, isParent?: boolean): Promise<MapRecord[]> {
      const polygon = turf.polygon(feature.coordinates)
      let query : any = {
          geo: {
              $geoIntersects: {
                  $geometry: polygon.geometry
              }
          }
      }
      if(isParent !== undefined) query = { isParent, ...query}
      const results = await this.mapRecord.find(query)
      const coverageFiltered = this.filterCoverage(polygon.geometry, results)
      return coverageFiltered
  }

  async multyPolygonIntersect(feature: turf.MultiPolygon, isParent?: boolean): Promise<MapRecord[]> {
      const multipolygon = turf.multiPolygon(feature.coordinates)
      let query : any = {
          geo: {
              $geoIntersects: {
                  $geometry: multipolygon.geometry
              }
          }
      }
      if(isParent !== undefined) query = { isParent, ...query}
      const results = await this.mapRecord.find(query)
      const coverageFiltered = this.filterCoverage(multipolygon.geometry, results)
      return coverageFiltered
  }


  async findByEncoded(raw: string): Promise<MapRecord[]>  {
      const encoded = raw.replace(/,/g, '_')
      const results = await this.mapRecord.find({
          encoded: new RegExp(encoded)
      })
      return results
  }

  async findByName(name: string, type: 'city' | 'district') {
      const query : any= {
          slug: slugify(name)
      }
      if(type === 'city') query.level = { $lte: 4 }
      if(type === 'district') query.level = { $gte: 5 }

      const results = await this.mapRecord.find(query)
      return results
  }

  filterCoverage(polygon: Polygon | MultiPolygon, geometries: MapRecord[]) {
      const polygon_area = turf.area(polygon);
      return geometries.filter((r) => {
          const intersection = turf.intersect(r.geo, polygon);
          if(!intersection) return false
          const intersection_area = turf.area(intersection);
          const polyCoverage = intersection_area / polygon_area;
          return polyCoverage > 0.05
      })
  }
}
