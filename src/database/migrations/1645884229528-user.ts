import {MigrationInterface, QueryRunner} from "typeorm";

export class user1645884229528 implements MigrationInterface {
    name = 'user1645884229528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "token" character varying(1700) NOT NULL DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "token" character varying(700) NOT NULL DEFAULT 'USER'`);
    }

}
