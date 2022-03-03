import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
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

  @Get('quiz/score/:quizid')
  quizScore(@Req() req, @Param('quizid') quizid: string) {
    const { user } = req?.auth;
    return this.eventService.findQuizScore(+quizid, user.id);
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
