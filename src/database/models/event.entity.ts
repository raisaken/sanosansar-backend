import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'event' })
export class Events extends BaseEntity {
    @Column({ type: 'varchar', length: 500, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 700, nullable: true })
    description: string;

    @Column({ name: 'meeting_link', type: 'varchar', length: 300, nullable: true })
    meetingLink: string;

    @Column({ name: 'is_registration_open', type: 'boolean', default: true })
    isRegistrationOpen: boolean;

    @Column({ name: 'type', type: 'varchar', length: '50', default: 'DEBATE' })
    type: string;

    @Column({ name: 'event_date', type: 'date', nullable: true })
    eventDate: string;

    @Column({ name: 'starting_dtm', type: 'timestamptz', nullable: true })
    startingDtm: Date;

    @Column({ name: 'ending_dtm', type: 'timestamptz', nullable: true })
    endingDtm: Date;   
}