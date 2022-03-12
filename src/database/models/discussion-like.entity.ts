import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Question } from '.';
import { Discussion } from './discussion.entity';
import { Events } from './event.entity';
import { User } from './user.entity';

@Entity({ name: 'discussion_like' })
export class DiscussionLike {
    @PrimaryColumn({ generated: true })
    id: number;

    @ManyToOne(() => Discussion, discussion => discussion.id)
    @JoinColumn({ name: 'discussion_id' })
    discussion: Discussion;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date; 
}