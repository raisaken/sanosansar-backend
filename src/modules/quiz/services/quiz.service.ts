import { Injectable } from '@nestjs/common';
import { QuizCompetition } from 'src/database/models/quiz.competition.entity';
import { Quiz } from 'src/database/models/quiz.entity';
import { Connection, Repository } from 'typeorm';
import { QuizInput, UpdateQuizInput } from '../dto/quiz.input';

@Injectable()
export class QuizService {
    private _quizRepository: Repository<Quiz>;
    private _questionCompetitionRepository: Repository<QuizCompetition>;

    constructor(private _connection: Connection) {
        this._quizRepository = this._connection.getRepository(Quiz);
        this._questionCompetitionRepository = this._connection.getRepository(QuizCompetition);
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

    async findQuizScore(quizId: number, userId: number) {
        const compInfo = await this._questionCompetitionRepository
            .createQueryBuilder('competition')
            .leftJoinAndSelect('competition.question', 'question')
            .leftJoinAndSelect('question.category', 'category')
            .leftJoinAndSelect('question.options', 'options')
            .addSelect('options.isCorrect')
            .where({
                quiz: quizId,
                user: userId
            })
            .getMany();

        const totalTimeSpent = compInfo.reduce((previousValue, currentValue) => previousValue + currentValue.timeSpent, 0);
        const correctAnswers = compInfo.filter((answer) => answer.option && answer.question.options.find((opt) => opt.id === answer.option && opt.isCorrect));
        const totalScore = correctAnswers.reduce((previousValue, currentValue) => previousValue + currentValue.question.category.score, 0);
        const wrongAnswers = compInfo.filter((answer) => answer.option && answer.question.options.find((opt) => opt.id !== answer.option && !opt.isCorrect));

        return {
            totalTimeSpent,
            totalScore,
            totalCorrectAnswers: correctAnswers.length,
            totalWrongAnswers: wrongAnswers.length,
        };

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
