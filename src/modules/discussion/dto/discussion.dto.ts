import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from '@nestjs/swagger';

export class CreateDiscussionDto {
  @ApiProperty({ type: String, description: 'title of the discussion' })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  files?: any;
  
  @ApiProperty({ type: String })
  type?: string;

  @ApiProperty({ type: Number })
  parent?: number

  @ApiProperty({ type: Date })
  timeToPublish?: Date;

  @ApiProperty({ type: Boolean })
  isActive?: boolean;
}

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {}

