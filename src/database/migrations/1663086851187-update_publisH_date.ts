import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePublisHDate1663086851187 implements MigrationInterface {
    name = 'updatePublisHDate1663086851187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion" ADD "time_to_publish" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "time_to_publish" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "time_to_publish"`);
        await queryRunner.query(`ALTER TABLE "discussion" DROP COLUMN "time_to_publish"`);
    }

}
