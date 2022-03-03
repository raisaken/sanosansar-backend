import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Events } from './event.entity';
import { EventCompetition } from './event-competition.entity';

@Entity({ name: 'event_registration' })
export class EventRegistration extends BaseEntity {
    @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
    firstName: string;

    @Column({ name: 'middle_name', type: 'varchar', length: 30, nullable: true })
    middleName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: true })
    email: string;

    @Column({ name: 'phone_number', type: 'int', nullable: true })
    phoneNumber: number;

    @Column({ name: 'guardian_name', type: 'varchar', length: 30, nullable: false })
    guardianName: string;

    @Column({ name: 'guardian_phone_number', type: 'int', nullable: true  })
    guardianPhoneNumber: number;
    
    @Column({ name: 'school_name', type: 'varchar', length: 100, nullable: true })
    schoolName: string;

    @ManyToOne(() => Events, event => event.registrations)
    @JoinColumn({ name: 'event_id' })
    event: Events;  

    // @OneToMany(() => EventCompetition, eventCompetition => eventCompetition.eventRegistration)
    // competitions?: EventCompetition[];
}