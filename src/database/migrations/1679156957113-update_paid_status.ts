import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePaidStatus1679156957113 implements MigrationInterface {
    name = 'updatePaidStatus1679156957113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "download" ADD "class" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "download" ADD "thumbnail" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "is_paid" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "class" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "page" ADD "meta" text`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "download" ADD "title" character varying(520)`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "download" ADD "description" character varying(1040)`);
//        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
//        await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "download" ADD "description" character varying(400)`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "download" ADD "title" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "class"`);
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "is_paid"`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "download" DROP COLUMN "class"`);
    }

}
