import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateQuizDto, UpdateQuizDto } from './dto/quiz.dto';
import { QuizService } from './services/quiz.service';

@Controller('quiz')
@ApiTags('quiz')
@ApiBearerAuth('authorization')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(@Body() createQuizDto: CreateQuizDto) {
    try {
      const res = await this.quizService.create(createQuizDto);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    try {
      return this.quizService.update(+id, updateQuizDto);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
