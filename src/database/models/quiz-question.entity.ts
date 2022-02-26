import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Question } from '.';
import { QuizRegistration } from './quiz-registration.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quiz_question' })
export class QuizQuestion {
    @PrimaryColumn({ generated: true })
    id: number;

    @ManyToOne(() => Question, question => question.id)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    @ManyToOne(() => Quiz, quiz => quiz.id)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}