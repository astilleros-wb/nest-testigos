import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import * as crypto from 'crypto';
import { Image } from './entities/image.entity';
@Injectable()
export class ImageCheckerService {
  constructor(
    @InjectModel(Image.name)
    private readonly imageModel: Model<Image>,
  ) {}

  async findWitnessIdFromImageUrls(urls: string[]) {
    for (const url of urls) {
      // Buscar la imagen en la base de datos por huella digital
      const existingUrl = await this.imageModel.findOne({
        url,
      });

      if (existingUrl) {
        console.log('imagen duplicada por url');
        return existingUrl.witness;
      }

      // Buscar la imagen en la base de datos por huella digital
      const fingerprint = await this.generateImageFingerprint(url);
      const existingFingerprint = await this.imageModel.findOne({
        fingerprint,
      });

      if (existingFingerprint) {
        console.log('imagen duplicada por huella digital');
        return existingFingerprint.witness;
      }

      // Creamos nuevo registro de imagen
      const newImage = new this.imageModel({
        fingerprint,
        url,
      });
      await newImage.save();
    }

    return null;
  }

  async generateImageFingerprint(url: string): Promise<string> {
    console.log('generateImageFingerprint', url);
    // Descargar la imagen desde la URL
    //https://static.inmofactory.com/images/inmofactory/documents/1/119147/32412378/526817458.jpg?rule=web_324x160
    const response = await fetch(
      url.replace(/rule=original/g, 'rule=web_324x160'),
    );
    const buffer = await response.arrayBuffer();
    // Redimensionar la imagen a un tamaño fijo para normalizar las huellas digitales
    const resizedImageBuffer = await sharp(buffer) /* .resize(256, 256) */
      .toBuffer();
    // Calcular el hash MD5 de la imagen redimensionada para generar la huella digital
    const hash = crypto.createHash('md5');
    hash.update(resizedImageBuffer);
    const fingerprint = hash.digest('hex');
    return fingerprint;
  }
}
