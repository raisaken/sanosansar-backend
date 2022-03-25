import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DownloadService } from './download.service';
import { CreateDownloadDto, UpdateDownloadDto } from './dto/download.dto';

@ApiTags('download')
@Controller('download')
@ApiBearerAuth('authorization')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) { }

  @Post()
  create(@Body() createDownloadDto: CreateDownloadDto) {
    return this.downloadService.create(createDownloadDto);
  }

  @Get()
  findAll() {
    return this.downloadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.downloadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDownloadDto: UpdateDownloadDto) {
    return this.downloadService.update(+id, updateDownloadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.downloadService.remove(+id);
  }
}
