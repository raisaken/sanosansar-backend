import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Question } from '.';
import { BaseEntity } from './base.entity';

@Entity({ name: 'event_competition' })
export class EventCompetition extends BaseEntity {
    @Column({ name: 'time_spent', type: 'int', nullable: true })
    timeSpent: number;

    @Column({ name: 'user_id', type: 'int', nullable: true })
    user: number;

    @Column({ name: 'event_id', type: 'int', nullable: true })
    event: number;

    // @Column({ name: 'question_id', type: 'int', nullable: true })
    // question: number;

    @Column({ name: 'option_id', type: 'int', nullable: true })
    option: number;

    @ManyToOne(() => Question, question => question.competitions)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    // @ManyToOne(() => QuizRegistration, quizRegistration => quizRegistration.competitions)
    // @JoinColumn({ name: 'quiz_registration_id' })
    // quizRegistration: QuizRegistration;
}