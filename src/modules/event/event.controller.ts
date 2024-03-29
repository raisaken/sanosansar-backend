import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/services/user.service';
import {
  CreateEventRegistrationDto,
  CreateEventRegistrationInput,
  UpdateEventRegistrationDto,
} from './dto/event-registration.dto';
import { AddScoreDto, CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { EventScoreInput } from './dto/event.input';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      const res = await this.eventService.create(createEventDto);
      return res;
    } catch (err) {
      throw err;
    }
  }

  @Post('registers')
  async eventRegistration(
    @Req() req,
    @Body() createEventRegistrationDto: CreateEventRegistrationDto,
  ) {
    const { user } = req?.auth;
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      guardianName,
      guardianPhoneNumber,
      schoolName,
      eventId,
      userId,
    } = createEventRegistrationDto;
    try {
      const input: CreateEventRegistrationInput = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        guardianName,
        guardianPhoneNumber,
        schoolName,
        userId: userId ?? user?.id,
        createdBy: user?.id,
        updatedBy: user?.id,
      };

      const isAlreadyExists = await this.eventService.findRegistrationDetails(
        eventId,
        user.id,
      );
      if (isAlreadyExists) {
        return isAlreadyExists;
      }

      if (eventId) {
        const event = await this.eventService.findById(+eventId);
        if (!event) {
          throw new NotFoundException(`Invalid event id`);
        }
        input.event = event;
      }
      return await this.eventService.eventRegistration(input);
    } catch (err) {
      throw err;
    }
  }

  @Patch('registers/:id')
  async updateEventRegistration(
    @Param('id') id: string,
    @Body() updateEventRegistrationDto: UpdateEventRegistrationDto,
  ) {
    try {
      const { eventId } = updateEventRegistrationDto || {};
      if (eventId) {
        const event = await this.eventService.findById(+eventId);
        if (!event) {
          throw new NotFoundException(`Invalid event id`);
        }
      }
      return await this.eventService.updateEventRegistration(
        +id,
        updateEventRegistrationDto,
      );
    } catch (err) {
      throw err;
    }
  }

  @Get('registers')
  findAllRegisteredEvents(@Req() req) {
    const { user } = req?.auth;
    return this.eventService.findAllRegisteredEvents(user.id);
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
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
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

  @Get('/judge/score/')
  async getAllScores(@Req() req) {
    const { user } = req?.auth;
    try {
      const res = await this.eventService.findAllEventScores();
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

  @Get('/judge/score/:id/:participantid')
  async getEventScoresOfParticipant(
    @Req() req,
    @Param('id') id: string,
    @Param('participantid') participantid: string,
  ) {
    const { user } = req?.auth;
    try {
      const res = await this.eventService.findEventScoresOfParticipant(
        +id,
        +participantid,
      );
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }
}
