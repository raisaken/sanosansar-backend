import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateGallaryDto, UpdateGallaryDto } from './dto/gallary.dto';
import { GallaryService } from './gallary.service';

@ApiTags('gallary')
@Controller('gallary')
@ApiBearerAuth('authorization')
export class GallaryController {
  constructor(private readonly gallaryService: GallaryService) {}

  @Post()
  create(@Body() createGallaryDto: CreateGallaryDto) {
    return this.gallaryService.create(createGallaryDto);
  }

  @Get()
  findAll() {
    return this.gallaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gallaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGallaryDto: UpdateGallaryDto) {
    return this.gallaryService.update(+id, updateGallaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gallaryService.remove(+id);
  }
}
