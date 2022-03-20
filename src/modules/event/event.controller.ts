import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/services/user.service';
import { AddScoreDto, CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventScoreInput } from './dto/event.input';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) { }

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

  @Post('/judge/score')
  async addScore(@Req() req, @Body() addScoreDto: AddScoreDto) {
    const { user } = req?.auth;
    const { eventId, score, participantId, remarks } = addScoreDto;
    try {
      const participant = await this.userService.findOne(participantId);

      const scoreInfo: EventScoreInput = {
        event: eventId,
        score,
        participant,
        judge: user.id,
        remarks,
      };
      const res = await this.eventService.adddEventScore(scoreInfo);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get('/judge/score/:id')
  async getEventScores(@Req() req, @Param('id') id: string) {
    const { user } = req?.auth;
    try {
      const res = await this.eventService.findEventScores(+id);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}
