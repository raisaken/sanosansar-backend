import { Injectable } from '@nestjs/common';
import { EventCompetition } from 'src/database/models/event-competition.entity';
import { EventScore } from 'src/database/models/event-score.entity';
import { Events } from 'src/database/models/event.entity';
import { Connection, Repository } from 'typeorm';
import { EventInput, EventScoreInput, UpdateEventInput } from './dto/event.input';

@Injectable()
export class EventService {
    private _eventRepository: Repository<Events>;
    private _eventScoreRepository: Repository<EventScore>;
    private _eventCompetitionRepository: Repository<EventCompetition>;

    constructor(private _connection: Connection) {
        this._eventRepository = this._connection.getRepository(Events);
        this._eventScoreRepository = this._connection.getRepository(EventScore);
        this._eventCompetitionRepository = this._connection.getRepository(EventCompetition);
    }

    async createOption(input: any) {
        const res = await this._eventRepository.save(input);
        return res;
    }

    async create(input: EventInput) {
        const res = await this._eventRepository.save(input);
        return res;
    }

    findAll() {
        return this._eventRepository.find();
    }

    findOne(id: number) {
        return this._eventRepository.findOne({
            where: {
                id
            },
        });
    }

    async findQuizScore(quizId: number, userId: number) {
        const compInfo = await this._eventCompetitionRepository
            .createQueryBuilder('competition')
            .leftJoinAndSelect('competition.question', 'question')
            .leftJoinAndSelect('question.category', 'category')
            .leftJoinAndSelect('question.options', 'options')
            .addSelect('options.isCorrect')
            .where({
                event: quizId,
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

    async update(id: number, updatedEvent: UpdateEventInput) {
        try {
            const event = await this._eventRepository.findOneOrFail(id);
            event.title = updatedEvent.title || event.title;
            event.description = updatedEvent.description || event.description;
            event.isRegistrationOpen = updatedEvent.isRegistrationOpen || event.isRegistrationOpen;
            event.eventDate = updatedEvent.eventDate || event.eventDate;
            event.startingDtm = updatedEvent.startingDtm || event.startingDtm;
            event.endingDtm = updatedEvent.endingDtm || event.endingDtm;
            event.meetingLink = updatedEvent.meetingLink || event.meetingLink;
            event.type = updatedEvent.type || event.type;

            await this._eventRepository.save(event);
            return event;
        } catch (err) {
            throw new Error(err)
        }
    }

    remove(id: number) {
        return this._eventRepository.delete(id);
    }

    async adddEventScore(input: EventScoreInput) {
        const res = await this._eventScoreRepository.save(input);
        return res;
    }


    async findEventScores(eventId: number) {
        const compInfo = await this._eventScoreRepository
            .createQueryBuilder('eventScore')
            .leftJoinAndSelect('eventScore.participant', 'participant')
            .where({
                event: eventId,
            })
            .getMany();


        return compInfo;

    }
}
