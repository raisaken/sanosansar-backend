import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Events } from 'src/database/models/event.entity';

export class CreateEventRegistrationDto {
    @ApiProperty({ type: String })
    firstName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    middleName?: string;

    @ApiProperty({ type: String })
    lastName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    email?: string;

    @ApiProperty({ type: String })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ type: String })
    guardianName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    guardianPhoneNumber?: string;

    @ApiProperty({ type: String })
    @IsOptional()
    schoolName?: string;

    @ApiProperty({ type: Number })
    eventId: number;
}

export class CreateEventRegistrationInput {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    phoneNumber?: string;
    guardianName: string;
    guardianPhoneNumber?: string;
    schoolName?: string;
    event?: Events;
}

export class UpdateEventRegistrationDto extends PartialType(CreateEventRegistrationDto) { }

