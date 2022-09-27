import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedescription1664246429616 implements MigrationInterface {
    name = 'updatedescription1664246429616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "discussion" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "description" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "description" character varying(400)`);
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "discussion" ADD "description" character varying(300)`);
    }

}
