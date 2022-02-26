import { PartialType } from "@nestjs/swagger";

export class QuizInput {
    title: string;
    description: string;
    isRegistrationOpen?: boolean;
    quizDate?: string;
    startingDtm?: Date;
    endingDtm?: Date;
}

export class UpdateQuizInput extends PartialType(QuizInput) {}
