import {MigrationInterface, QueryRunner} from "typeorm";

export class discussionType1647183384664 implements MigrationInterface {
    name = 'discussionType1647183384664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" ADD "type" character varying(50) NOT NULL DEFAULT 'general'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "type"`);
    }

}
