import { Injectable } from '@nestjs/common';
import { Page } from 'src/database/models/page.entity';
import { Connection, Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { PaginationQueryDto } from './dto/page-query.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PageService {
  private _pageRepository: Repository<Page>;

  constructor(private _connection: Connection) {
    this._pageRepository = this._connection.getRepository(Page);
  }

  async create(pageInput: CreatePageDto) {
    const page = await this._pageRepository.save(pageInput);
    return page;
  }

  findAll(query: PaginationQueryDto) {
    const { name } = query;
    const condition: any = {};
    if(query){
      condition.name = name;
    }
    return this._pageRepository.find({ where: condition });
  }

  findOne(id: number) {
    return this._pageRepository.findOne(id);
  }

  findByName(name: string) {
    return this._pageRepository.find({ where: { name } });
  }

  async update(id: number, updatePageDto: UpdatePageDto) {
    const { name, title, description, image } = updatePageDto;
    const page = await this.findOne(id);

    if (page) {
      page.name = name || page.name;
      page.title = title || page.title;
      page.description = description || page.description;
      // page.image = image || page.image;
      await this._pageRepository.save(page);
    }
    return page;
  }

  remove(id: number) {
    return this._pageRepository.delete(id);
  }
}
