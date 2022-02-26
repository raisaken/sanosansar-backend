import { QuizQuestion } from './quiz-question.entity';
import { QuizRegistration } from './quiz-registration.entity';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { QuizCompetition } from './quiz.competition.entity';
import { Question } from './question.entity';

@Entity({ name: 'quiz' })
export class Quiz extends BaseEntity {
    @Column({ type: 'varchar', length: 500, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 700, nullable: true })
    description: string;

    @Column({ name: 'is_registration_open', type: 'boolean', default: true })
    isRegistrationOpen: boolean;

    @Column({ name: 'quiz_date', type: 'date', nullable: true })
    quizDate: string;

    @Column({ name: 'starting_dtm', type: 'timestamptz', nullable: true })
    startingDtm: Date;

    @Column({ name: 'ending_dtm', type: 'timestamptz', nullable: true })
    endingDtm: Date;

    @OneToMany(() => QuizRegistration, quizRegistration => quizRegistration.quiz)
    registrations?: QuizRegistration[];

    @OneToMany(() => QuizQuestion, quizQuestion => quizQuestion.quiz)
    quizQuestion: QuizQuestion;

    // @ManyToMany(() => Question, question => question.quizes)
    // @JoinTable({ name: 'quiz_question' })
    // questions: Question[];
}