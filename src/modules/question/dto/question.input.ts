import { PartialType } from '@nestjs/mapped-types';
import { Category } from 'src/database/models/category.entity';
import { QuestionOption } from 'src/database/models/question-option.entity';

export class QuestionInput {
    title: string;
    category?: Category;
    options?: QuestionOption[];
}

export class QuestionOptionInput {
    title: string;
    description?: string;
    isCorrect: boolean;
}

export class SubmitAnswerInput {
    user: number;
    option: number;
    question: number;
    timeSpent?: number;
  }

export class UpdateQuestionInput extends PartialType(QuestionInput) { }
export class UpdateAnswerInput extends PartialType(SubmitAnswerInput) {}
export class UpdateQuestionOptionInput extends PartialType(QuestionOptionInput) { }