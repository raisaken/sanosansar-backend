import { PartialType } from "@nestjs/swagger";

export class CreateQuizDto {
    title: string;
    description: string;
    isRegistrationOpen?: boolean;
    quizDate?: string; 
    startingDtm?: Date;
    endingDtm?: Date;
}

export class UpdateQuizDto extends PartialType(CreateQuizDto) {}
