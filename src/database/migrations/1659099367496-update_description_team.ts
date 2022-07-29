import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDescriptionTeam1659099367496 implements MigrationInterface {
    name = 'updateDescriptionTeam1659099367496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "description" character varying(700)`);
    }

}
