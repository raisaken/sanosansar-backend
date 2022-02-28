import { Injectable } from '@nestjs/common';
import { Events } from 'src/database/models/event.entity';
import { Connection, Repository } from 'typeorm';
import { EventInput, UpdateEventInput } from './dto/event.input';

@Injectable()
export class EventService {
    private _eventRepository: Repository<Events>;

    constructor(private _connection: Connection) {
        this._eventRepository = this._connection.getRepository(Events);
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
}
