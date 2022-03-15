import { Entity,  Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'event_score' })
export class EventScore {
    @PrimaryColumn({ generated: true })
    id: number;

    @Column({ name: 'event_id', type: 'integer', nullable: true })
    event: number;

    @Column({ name: 'score', type: 'int', nullable: true })
    score: number;

    @Column({ name: 'remarks', type: 'varchar', length: 400, nullable: true })
    remarks?: string;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    participant: User;

    @Column({ name: 'judge_id', type: 'integer', nullable: true })
    judge: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}
