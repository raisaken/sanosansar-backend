import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { QuestionOption } from './question-option.entity';
import { QuizCompetition } from './quiz.competition.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'quiz_registration' })
export class QuizRegistration extends BaseEntity {
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

    @ManyToOne(() => Quiz, quiz => quiz.registrations)
    @JoinColumn({ name: 'quiz_id' })
    quiz: Quiz;  

    // @OneToMany(() => QuizCompetition, quizCompetition => quizCompetition.quizRegistration)
    // competitions?: QuizCompetition[];
}