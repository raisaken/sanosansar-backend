import { QuestionService } from './question.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateQuestionDto,
  CreateQuestionOptionDto,
  UpdateQuestionDto,
} from './dto/question.dto';
import { CategoryService } from '../category/category.service';
import { QuestionInput, UpdateQuestionInput } from './dto/question.input';

@ApiTags('question')
@Controller('question')
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
