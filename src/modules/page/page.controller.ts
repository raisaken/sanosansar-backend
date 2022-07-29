import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/page-query.dto';

@ApiTags('page')
@Controller('page')
@ApiBearerAuth('authorization')
export class PageController {
  constructor(private readonly pageService: PageService) { }

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pageService.create(createPageDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.pageService.findAll(query);
  }

  @Get('/info')
  async findByName(@Query() query: PaginationQueryDto) {
    try {
      const { name } = query;
      const page = await this.pageService.findByName(name);
      if (!page) {
        throw new NotFoundException(`Page with name: ${name} not found.`)
      }
      return page;
    } catch (err) {
      throw err;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pageService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
