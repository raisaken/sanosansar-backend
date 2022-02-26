import { Entity, Column,JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';

@Entity({ name: 'question_options' })
export class QuestionOption extends BaseEntity {
    @Column({ type: 'varchar', length: 100, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    description: string;

    @Column({ name: 'is_correct', type: 'boolean', default: false, select: false })
    isCorrect: boolean;

    @ManyToOne(() => Question, question => question.options)
    @JoinColumn({ name: 'question_id' })
    question: Question;
}