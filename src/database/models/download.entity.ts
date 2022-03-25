import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'download' })
export class Download extends BaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    title?: string;

    @Column({ name: 'description', type: 'varchar', length: 400, nullable: true })
    description?: string;

    @Column({ name: 'type', type: 'varchar', length: '50', default: 'image' })
    type?: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    url: string;

    @Column({ name: 'is_paid', type: 'boolean', default: false })
    isPaid?: boolean;
}
