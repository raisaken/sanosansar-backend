import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';

export class CreateDiscussionDto {
  @ApiProperty({ type: String, description: 'title of the discussion' })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  file?: string;

  @ApiProperty({ type: Number })
  parent?: number
}

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {}

