import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Events } from 'src/database/models/event.entity';

export class CreateEventRegistrationDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    middleName?: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    email?: string;

    @ApiProperty({ type: String })
    @IsOptional()
    phoneNumber?: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    guardianName: string;

    @ApiProperty({ type: String })
    @IsOptional()
    guardianPhoneNumber?: string;

    @ApiProperty({ type: String })
    @IsOptional()
    schoolName?: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
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

