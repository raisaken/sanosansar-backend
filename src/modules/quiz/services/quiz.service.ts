import { Injectable } from '@nestjs/common';
import { Quiz } from 'src/database/models/quiz.entity';
import { Connection, Repository } from 'typeorm';
import { QuizInput, UpdateQuizInput } from '../dto/quiz.input';

@Injectable()
export class QuizService {
    private _quizRepository: Repository<Quiz>;

    constructor(private _connection: Connection) {
        this._quizRepository = this._connection.getRepository(Quiz);
    }

    async create(input: QuizInput) {
        const res = await this._quizRepository.save(input);
        return res;
    }

    findAll() {
        return this._quizRepository.find();
    }

    findOne(id: number) {
        return this._quizRepository.findOne({
            where: {
                id
            },
        });
    }

    async update(id: number, updatedQuiz: UpdateQuizInput) {
        try {
            const quiz = await this._quizRepository.findOneOrFail(id);
            quiz.title = updatedQuiz.title || quiz.title;
            quiz.description = updatedQuiz.description || quiz.description;
            quiz.isRegistrationOpen = updatedQuiz.isRegistrationOpen || quiz.isRegistrationOpen;
            quiz.quizDate = updatedQuiz.quizDate || quiz.quizDate;
            quiz.startingDtm = updatedQuiz.startingDtm || quiz.startingDtm;
            quiz.endingDtm = updatedQuiz.endingDtm || quiz.endingDtm;

            await this._quizRepository.save(quiz);
            return quiz;
        } catch (err) {
            throw new Error(err)
        }
    }

    remove(id: number) {
        return this._quizRepository.delete(id);
    }
}
