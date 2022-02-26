import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { QuestionOption } from './question-option.entity';

@Entity({ name: 'question' })
export class Question extends BaseEntity {
    @Column({ type: 'varchar', length: 500, nullable: false })
    title: string;

    @OneToMany(() => QuestionOption, option => option.question)
    options?: QuestionOption[];

    @ManyToOne(() => Category, category => category.questions)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}