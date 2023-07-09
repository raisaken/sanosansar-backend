import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  @IsOptional()
  middleName?: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: Number })
  phoneNumber?: number;

  @ApiProperty({ type: Number })
  categoryId?: number;

  @ApiProperty({ type: String })
  gender: string;

  @ApiProperty({ type: String })
  role?: string;

  @ApiProperty({ type: String })
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @ApiProperty({ type: String })
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  profilePicture?: string;
}

export class CreateQuestionOptionDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Boolean })
  isCorrect: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateQuestionOptionDto extends PartialType(
  CreateQuestionOptionDto,
) {}
