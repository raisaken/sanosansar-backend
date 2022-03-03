import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { QuestionOption } from './question-option.entity';
import { EventQuestion } from './event-question.entity';
import { EventCompetition } from './event-competition.entity';

@Entity({ name: 'question' })
export class Question extends BaseEntity {
    @Column({ type: 'varchar', length: 500, nullable: false })
    title: string;

    @OneToMany(() => QuestionOption, option => option.question)
    options?: QuestionOption[];

    @ManyToOne(() => Category, category => category.questions)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => EventQuestion, eventQuestion => eventQuestion.question)
    eventQuestion: EventQuestion;

    // @ManyToMany(() => Quiz, quiz => quiz.questions)
    // @JoinTable({ name: 'quiz_question' })
    // quizes: Quiz[];

    @OneToMany(() => EventCompetition, eventCompetition => eventCompetition.question)
    competitions?: EventCompetition[];
}