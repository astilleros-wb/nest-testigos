import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FotocasaLocation, FotocasaLocationSchema } from './entities/fotocasa-location';
import { FotocasaLocationService } from './fotocasa-location-parser.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: FotocasaLocation.name, schema: FotocasaLocationSchema }])],
  providers: [FotocasaLocationService],
  exports: [FotocasaLocationService]
})
export class FotocasaLocationParserModule {


  constructor(
    private readonly fotocasaLocationService : FotocasaLocationService
  ){}

  async onModuleInit() {
    await this.fotocasaLocationService.checkSeed()
  }
}
