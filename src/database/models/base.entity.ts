import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @Column({ name: 'is_archived', type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'created_by', type: 'varchar', length: 300, nullable: true })
    createdBy: string;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'updated_by', type: 'varchar', length: 300 , nullable: true})
    updatedBy: string;

    @Column({ name: 'internal_comment', type: 'varchar', length: 300, nullable: true, select: false })
    internalComment: string | null;
}