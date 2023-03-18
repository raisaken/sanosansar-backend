import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'gallary' })
export class Gallery extends BaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    title?: string;

    @Column({ name: 'description', type: 'text', nullable: true })
    description?: string;

    @Column({ name: 'type', type: 'varchar', length: '50', default: 'image' })
    type?: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    url: string;

    @Column({ name: 'time_to_publish', type: 'timestamptz', nullable: true })
    timeToPublish?: Date;

    @Column({ name: 'is_paid', type: 'boolean', default: false })
    isPaid?: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true })
    class?: string;
}