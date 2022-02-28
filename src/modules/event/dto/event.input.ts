import { PartialType } from "@nestjs/swagger";

export class EventInput {
    title: string;
    description: string;
    meetingLink: string;
    type: string;
    isRegistrationOpen?: boolean;
    eventDate?: string;
    startingDtm?: Date;
    endingDtm?: Date;
}

export class UpdateEventInput extends PartialType(EventInput) { }
