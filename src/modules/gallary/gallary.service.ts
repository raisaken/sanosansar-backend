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
    const gallary = await this._gallaryReopository.findOneOrFail(id);
    gallary.title = updateGallaryDto.title || gallary.title;
    gallary.description = updateGallaryDto.description || gallary.description;
    gallary.type = updateGallaryDto.type || gallary.type;
    gallary.url = updateGallaryDto.url || gallary.url;
    await this._gallaryReopository.save(gallary);
    return gallary;
  }

  remove(id: number) {
    return this._gallaryReopository.delete(id);
  }
}
