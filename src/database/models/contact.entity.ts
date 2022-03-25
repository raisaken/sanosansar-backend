import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: false })
    name: string;

    @Column({ name: 'email', type: 'varchar', length: 30, nullable: false })
    email: string;

    @Column({ name: 'subject', type: 'varchar', length: 100, nullable: false })
    subject: string;

    @Column({ name: 'messgae', type: 'varchar', length: 400, nullable: false })
    message: string;
}