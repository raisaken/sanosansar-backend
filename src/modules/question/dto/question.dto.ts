import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateQuestionOptionDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description?: string;

  @ApiProperty({ type: Boolean })
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  categoryId?: number;

  // options
  @ApiProperty({ type: [CreateQuestionOptionDto] })
  options?: CreateQuestionOptionDto[];
}

export class SubmitAnswerDto {
  @ApiProperty({ type: String })
  timeSpent?: number;

   @ApiProperty({ type: Number })
  quizId?: number;

  // @ApiProperty({ type: Number })
  // userId?: number;

  // @ApiProperty({ type: Number })
  // questionId?: number;

  @ApiProperty({ type: Number })
  optionId: number;
}

export class UpdateAnswerDto extends PartialType(SubmitAnswerDto) {}
export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
export class UpdateQuestionOptionDto extends PartialType(
  CreateQuestionOptionDto,
) {}
