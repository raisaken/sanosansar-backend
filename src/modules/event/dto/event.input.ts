import { PartialType } from "@nestjs/swagger";
import { User } from "src/database/models/user.entity";

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

export class EventScoreInput {
    event: number;
    score: number;
    participant: User;
    remarks?: string;
    judge: User;
}

export class UpdateEventInput extends PartialType(EventInput) { }
