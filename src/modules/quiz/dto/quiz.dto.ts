import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Boolean })
  isRegistrationOpen?: boolean;

  @ApiProperty({ type: String })
  quizDate?: string;

  @ApiProperty({ type: Date })
  startingDtm?: Date;

  @ApiProperty({ type: Date })
  endingDtm?: Date;
}

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
