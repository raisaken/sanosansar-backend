import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadService } from '../upload/upload.service';
import { CreateFileDto, UpdateFileDto } from './dto/file.dto';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('file')
@FormDataRequest()
@ApiBearerAuth('authorization')
export class FileController {
  constructor(
    private readonly uploadService: UploadService,
  ) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  async create(@Body() createFileDto: CreateFileDto) {
    const { file } = createFileDto;
    try {
      if (file) {
        const fileLocation = await this.uploadService.uploadMedia(file);
        return { url: fileLocation };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // @Get()
  // findAll() {
  //   return this.fileService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
  //   return this.fileService.update(+id, updateFileDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fileService.remove(+id);
  // }
}
