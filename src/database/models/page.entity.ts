import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'page' })
export class Page extends BaseEntity {
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'image', type: 'varchar', length: 300, nullable: true })
    image?: string;

    @Column({ name: 'slug', type: 'varchar', length: 100, nullable: true })
    slug: string;
}