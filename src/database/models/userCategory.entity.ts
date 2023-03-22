import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, Tree, PrimaryColumn, TreeParent, TreeChildren, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_category' })
@Tree('materialized-path')
export class UserCategory {
    @ApiProperty()
    @PrimaryColumn({ generated: true })
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @ApiProperty()
    @Column({ type: 'varchar', length: 300, nullable: true })
    description: string;

    @ApiProperty()
    @TreeChildren()
    children: UserCategory[];
  
    @ApiProperty()
    @TreeParent()
    parent: UserCategory;

    @ApiProperty()
    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty()
    @Column({ name: 'is_archived', type: 'boolean', default: false })
    isArchived: boolean;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'created_by', type: 'varchar', length: 300, nullable: true })
    createdBy: string;

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ApiProperty()
    @Column({ name: 'updated_by', type: 'varchar', length: 300, nullable: true })
    updatedBy: string;

    @OneToMany(() => User, user => user.category)
    users?: User[];
}