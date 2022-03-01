import { UpdateQuestionOptionDto } from './dto/question.dto';
import { Injectable } from '@nestjs/common';
import { QuestionOption } from 'src/database/models/question-option.entity';
import { Question } from 'src/database/models/question.entity';
import { Connection, Repository } from 'typeorm';
import { QuestionInput, SubmitAnswerInput, UpdateQuestionInput, UpdateQuestionOptionInput } from './dto/question.input';
import { QuizCompetition } from 'src/database/models/quiz.competition.entity';

@Injectable()
export class QuestionService {
    private _questionRepository: Repository<Question>;
    private _questionOptionRepository: Repository<QuestionOption>;
    private _questionAnswerRepository: Repository<QuizCompetition>;


    constructor(private _connection: Connection) {
        this._questionRepository = this._connection.getRepository(Question);
        this._questionOptionRepository = this._connection.getRepository(QuestionOption);
        this._questionAnswerRepository = this._connection.getRepository(QuizCompetition);
    }

    async createOption(input: any) {
        const res = await this._questionOptionRepository.save(input);
        return res;
    }

    async saveAnswer(id, input: SubmitAnswerInput) {
        const question: Question = await this.findOne(+id);
        if (question) {
        return await this._questionAnswerRepository.save({
            ...input,
            question,
            });
        }
    }

    async addOption(id, input: any) {
        const question = await this.findOne(+id);
        if (question) {
        return await this.createOption({
                question,
                ...input
            });
        }
    }

    async create(input: QuestionInput) {
        const res = await this._questionRepository.save(input);
        return res;
    }

    findAll() {
        return this._questionRepository.find({
            relations: ['options']
        });
    }

    findOne(id: number) {
        return this._questionRepository.findOne({
            where: {
                id
            },
            relations: ['options']
        });
    }

    async updateOption(id: number, updatedOption: UpdateQuestionOptionInput) {
        try {
            const option = await this._questionOptionRepository.findOneOrFail(id);
            option.title = updatedOption.title || option.title;
            option.isCorrect = updatedOption.isCorrect || option.isCorrect;
            option.description = updatedOption.description || option.description;
            await this._questionOptionRepository.save(option);
            return option;
        } catch (err) {
            throw new Error(err)
        }
    }

    async update(id: number, updatedQuestion: UpdateQuestionInput) {
        try {
            const question = await this._questionRepository.findOneOrFail(id);
            question.title = updatedQuestion.title || question.title;
            await this._questionRepository.save(question);
            return question;
        } catch (err) {
            throw new Error(err)
        }
    }

    remove(id: number) {
        return this._questionRepository.delete(id);
    }
}
