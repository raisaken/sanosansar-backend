import {MigrationInterface, QueryRunner} from "typeorm";

export class user1646160115581 implements MigrationInterface {
    name = 'user1646160115581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_competition" ADD "quiz_id" integer`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" character varying(50) NOT NULL DEFAULT 'DEBATE'`);
        await queryRunner.query(`ALTER TABLE "quiz_competition" ADD CONSTRAINT "FK_0ce14b4b0d20222e32a84a748bb" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_competition" DROP CONSTRAINT "FK_0ce14b4b0d20222e32a84a748bb"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "type" character varying NOT NULL DEFAULT 'DEBATE'`);
        await queryRunner.query(`ALTER TABLE "quiz_competition" DROP COLUMN "quiz_id"`);
    }

}
