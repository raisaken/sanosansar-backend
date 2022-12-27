import { Injectable } from '@nestjs/common';
import { Download } from 'src/database/models/download.entity';
import { Connection, Repository } from 'typeorm';
import { CreateDownloadDto, UpdateDownloadDto } from './dto/download.dto';

@Injectable()
export class DownloadService {
  private _downloadRepository: Repository<Download>;

  constructor(private _connection: Connection) {
    this._downloadRepository = this._connection.getRepository(Download);
  }

  create(createDownloadDto: CreateDownloadDto) {
    return this._downloadRepository.save(createDownloadDto);
  }

  findAll() {
    return this._downloadRepository.find();
  }

  findOne(id: number) {
    return this._downloadRepository.findOne(id);
  }

  async update(id: number, updateDownloadDto: UpdateDownloadDto) {
    const download = await this._downloadRepository.findOneOrFail(id);
    download.title = updateDownloadDto.title || download.title;
    download.description = updateDownloadDto.description || download.description;
    download.type = updateDownloadDto.type || download.type;
    download.url = updateDownloadDto.url || download.url;
    download.isPaid = updateDownloadDto.isPaid || download.isPaid;
    await this._downloadRepository.save(download);
    return download;
  }

  remove(id: number) {
    return this._downloadRepository.delete(id);
  }
}
