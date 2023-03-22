import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Events } from './event.entity';
import { EventCompetition } from './event-competition.entity';
import { User } from './user.entity';

@Entity({ name: 'event_registration' })
export class EventRegistration extends BaseEntity {
    @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
    firstName: string;

    @Column({ name: 'middle_name', type: 'varchar', length: 30, nullable: true })
    middleName?: string;

    @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: true })
    email: string;

    @Column({ name: 'phone_number', type: 'varchar', nullable: true })
    phoneNumber: string;

    @Column({ name: 'guardian_name', type: 'varchar', length: 30, nullable: false })
    guardianName: string;

    @Column({ name: 'guardian_phone_number', type: 'varchar', nullable: true  })
    guardianPhoneNumber: string;
    
    @Column({ name: 'school_name', type: 'varchar', length: 100, nullable: true })
    schoolName: string;

    @ManyToOne(() => Events, event => event.registrations)
    @JoinColumn({ name: 'event_id' })
    event: Events;
    
    @Column({ name: 'is_verified', type: 'boolean', default: false })
    isVerified?: boolean;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column({ name: 'user_id' })
    userId?: number;

    // @OneToMany(() => EventCompetition, eventCompetition => eventCompetition.eventRegistration)
    // competitions?: EventCompetition[];
}