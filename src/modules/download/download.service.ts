import { Injectable } from '@nestjs/common';
import { Download } from 'src/database/models/download.entity';
import { Connection, Repository } from 'typeorm';
import { CreateDownloadDto, UpdateDownloadDto } from './dto/download.dto';

@Injectable()
export class DownloadService {
  private _downloadReopository: Repository<Download>;

  constructor(private _connection: Connection) {
    this._downloadReopository = this._connection.getRepository(Download);
  }

  create(createDownloadDto: CreateDownloadDto) {
    return this._downloadReopository.save(createDownloadDto);
  }

  findAll() {
    return this._downloadReopository.find();
  }

  findOne(id: number) {
    return this._downloadReopository.findOne(id);
  }

  async update(id: number, updateDownloadDto: UpdateDownloadDto) {
    const download = await this._downloadReopository.findOneOrFail(id);
    download.title = updateDownloadDto.title || download.title;
    download.description = updateDownloadDto.description || download.description;
    download.type = updateDownloadDto.type || download.type;
    download.url = updateDownloadDto.url || download.url;
    download.isPaid = updateDownloadDto.isPaid || download.isPaid;
    await this._downloadReopository.save(download);
    return download;
  }

  remove(id: number) {
    return this._downloadReopository.delete(id);
  }
}
