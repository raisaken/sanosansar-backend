import { QuestionService } from './question.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  SubmitAnswerDto,
  UpdateQuestionDto,
} from './dto/question.dto';
import { CategoryService } from '../category/category.service';
import { QuestionInput, SubmitAnswerInput, UpdateQuestionInput } from './dto/question.input';

@ApiTags('question')
@Controller('question')
@ApiBearerAuth('authorization')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    const { title, categoryId, options } = createQuestionDto;
    try {
      const questionInput: QuestionInput = {
        title,
      };
      if (categoryId) {
        questionInput.category = await this.categoryService.findOne(categoryId);
      }
      if (options) {
        questionInput.options = await this.questionService.createOption(
          options,
        );
      }
      const res = await this.questionService.create(questionInput);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('option/:id')
  async addOption(@Body() createQuestionOptionDto: CreateQuestionOptionDto, @Param('id') id: string) {
    return this.questionService.addOption(id, createQuestionOptionDto);
  }

  @Post('answer/:questionid')
  async submitAnswer(@Req() req, @Body() submitAnswerDto: SubmitAnswerDto, @Param('questionid') questionid: string) {
    const { user } = req?.auth;
    const { optionId, timeSpent, quizId } = submitAnswerDto;
    const answerInput: SubmitAnswerInput = {
      quiz: quizId,
      option: optionId,
      user: user.id,
      question: +questionid,
      timeSpent
    };
    return this.questionService.saveAnswer(questionid, answerInput);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    try {
      const updatedQuestion: UpdateQuestionInput = {
        title: updateQuestionDto.title,
      };

      if (updateQuestionDto.categoryId) {
        updatedQuestion.category = await this.categoryService.findOne(
          updateQuestionDto.categoryId,
        );
      }

      return this.questionService.update(+id, updatedQuestion);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
