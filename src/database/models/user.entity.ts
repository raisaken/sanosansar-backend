import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DiscussionLike } from './discussion-like.entity';
import { EventRegistration } from './event-registration.entity';
import { Token } from './token.entity';
import { UserCategory } from './userCategory.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ name: 'first_name', type: 'varchar', length: 30, nullable: false })
    firstName: string;

    @Column({ name: 'middle_name', type: 'varchar', length: 30, nullable: true })
    middleName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 30, nullable: false })
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: false, unique: true })
    email: string;
    
    // TODO: link category to user m-n

    @Column({ name: 'profile_picture', type: 'varchar', length: 300, nullable: true })
    profilePicture: string;
  
    @Column({ name: 'cover_picture', type: 'varchar', length: 300, nullable: true })
    coverPicture: string;
  
    @Column({ name: 'date_of_birth', type: 'date', nullable: false })
    dateOfBirth: string;
  
    @Column({ name: 'gender', type: 'varchar', length: 10, nullable: false })
    gender: string;

    @Column({ name: 'phone_number', type: 'bigint', nullable: true })
    phoneNumber: number;

    @Column({ name: 'password', type: 'varchar', length: 300, nullable: false, select: false })
    password: string;

    @Column({ name: 'role', type: 'varchar', length: 30, default: 'USER' })
    role: string;

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[];

    @OneToMany(() => DiscussionLike, like => like.user)
    discussionLikes?: DiscussionLike[];

    @OneToMany(() => EventRegistration, eventRegistration => eventRegistration.user)
    eventRegistration?: EventRegistration[];

    @ManyToOne(() => UserCategory, userCategory => userCategory.id)
    @JoinColumn({ name: 'category_id' })
    category: UserCategory;

    @Column({ name: 'category_id', nullable: true })
    categoryId?: number;
}