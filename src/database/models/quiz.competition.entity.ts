import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Question } from '.';
import { BaseEntity } from './base.entity';
import { QuizRegistration } from './quiz-registration.entity';

@Entity({ name: 'quiz_competition' })
export class QuizCompetition extends BaseEntity {
    @Column({ name: 'time_spent', type: 'int', nullable: true })
    timeSpent: number;

    @Column({ name: 'user_id', type: 'int', nullable: true })
    user: number;

    @Column({ name: 'quiz_id', type: 'int', nullable: true })
    quiz: number;

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