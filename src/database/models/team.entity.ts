import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'team' })
export class Team extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 70, nullable: true })
    position: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    order?: number;

    @Column({ name: 'phone_number', type: 'bigint', nullable: true })
    phone: number;

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: true })
    email: string;

    @Column({ name: 'facebook_link', type: 'varchar', length: 300, nullable: true })
    facebookLink?: string;

    @Column({ name: 'twitter_link', type: 'varchar', length: 300, nullable: true })
    twitterLink?: string;

    @Column({ name: 'instagram_link', type: 'varchar', length: 300, nullable: true })
    instagramLink?: string;

    @Column({ name: 'image', type: 'varchar', length: 300, nullable: true })
    image?: string;

    @Column({ name: 'slug', type: 'varchar', length: 100, nullable: true })
    slug: string;
}