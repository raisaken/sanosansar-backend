import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from '.';
import { Events } from './event.entity';

@Entity({ name: 'event_question' })
export class EventQuestion {
    @PrimaryColumn({ generated: true })
    id: number;

    @ManyToOne(() => Question, question => question.id)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    @ManyToOne(() => Events, event => event.id)
    @JoinColumn({ name: 'event_id' })
    event: Events;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}