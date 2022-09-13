import { Injectable } from '@nestjs/common';
import { Gallary } from 'src/database/models/gallary.entity';
import { Connection, Repository } from 'typeorm';
import { CreateGallaryDto, UpdateGallaryDto } from './dto/gallary.dto';

@Injectable()
export class GallaryService {
  private _gallaryReopository: Repository<Gallary>;

  constructor(private _connection: Connection) {
    this._gallaryReopository = this._connection.getRepository(Gallary);
  }

  create(createGallaryDto: CreateGallaryDto) {
    return this._gallaryReopository.save(createGallaryDto);
  }

  findAll() {
    return this._gallaryReopository.find();
  }

  findOne(id: number) {
    return this._gallaryReopository.findOne(id);
  }

  async update(id: number, updateGallaryDto: UpdateGallaryDto) {
    const { title, description, type, url, isActive, timeToPublish } = updateGallaryDto;
    const gallary = await this._gallaryReopository.findOneOrFail(id);
    if (gallary) {
      gallary.url = url || gallary.url;
      gallary.type = type || gallary.type;
      gallary.title = title || gallary.title;
      gallary.isActive = isActive === false ? false: isActive || gallary.isActive;
      gallary.description = description || gallary.description;
      gallary.timeToPublish = timeToPublish || gallary.timeToPublish;
      await this._gallaryReopository.save(gallary);
    }
    return gallary;
  }

  remove(id: number) {
    return this._gallaryReopository.delete(id);
  }
}
