import {MigrationInterface, QueryRunner} from "typeorm";

export class user1645883894054 implements MigrationInterface {
    name = 'user1645883894054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" integer`);
    }

}
