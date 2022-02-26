import { CategoryService } from './../category/category.service';
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  providers: [QuestionService, CategoryService],
  controllers: [QuestionController]
})
export class QuestionModule {}
