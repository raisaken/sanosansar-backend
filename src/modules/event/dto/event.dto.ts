import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  meetingLink: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: String })
  isRegistrationOpen?: boolean;

  @ApiProperty({ type: String })
  eventDate?: string;

  @ApiProperty({ type: Date })
  startingDtm?: Date;

  @ApiProperty({ type: Date })
  endingDtm?: Date;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
