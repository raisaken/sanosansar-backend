import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1645883520116 implements MigrationInterface {
    name = 'auth1645883520116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_picture" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cover_picture" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_of_birth" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_of_birth"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cover_picture"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_picture"`);
    }

}
