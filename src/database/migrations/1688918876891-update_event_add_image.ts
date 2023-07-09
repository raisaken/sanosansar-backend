import {MigrationInterface, QueryRunner} from "typeorm";

export class updateEventAddImage1688918876891 implements MigrationInterface {
    name = 'updateEventAddImage1688918876891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "image" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "image"`);
    }

}
