import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const res = await this.eventService.create(createEventDto);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    try {
      return this.eventService.update(+id, updateEventDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
