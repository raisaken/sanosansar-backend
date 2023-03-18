import { Injectable } from '@nestjs/common';
import { Gallery } from 'src/database/models/gallery.entity';
import { Connection, Repository } from 'typeorm';
import { CreateGalleryDto, UpdateGalleryDto } from './dto/gallery.dto';

@Injectable()
export class GalleryService {
  private _galleryRepository: Repository<Gallery>;

  constructor(private _connection: Connection) {
    this._galleryRepository = this._connection.getRepository(Gallery);
  }

  create(createGalleryDto: CreateGalleryDto) {
    return this._galleryRepository.save(createGalleryDto);
  }

  findAll() {
    return this._galleryRepository.find();
  }

  findOne(id: number) {
    return this._galleryRepository.findOne(id);
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    const { title, description, type, url, isActive, timeToPublish } = updateGalleryDto;
    const gallery = await this._galleryRepository.findOneOrFail(id);
    if (gallery) {
      gallery.url = url || gallery.url;
      gallery.type = type || gallery.type;
      gallery.title = title || gallery.title;
      gallery.isActive = isActive === false ? false : isActive || gallery.isActive;
      gallery.description = description || gallery.description;
      gallery.timeToPublish = timeToPublish || gallery.timeToPublish;
      gallery.isPaid = updateGalleryDto.isPaid || gallery.isPaid;
      gallery.class = updateGalleryDto.class || gallery.class;
      await this._galleryRepository.save(gallery);
    }
    return gallery;
  }

  remove(id: number) {
    return this._galleryRepository.delete(id);
  }
}
