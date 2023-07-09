import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserCategory1679507495181 implements MigrationInterface {
    name = 'addUserCategory1679507495181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_category" ("id" SERIAL NOT NULL, "name" character varying(50), "description" character varying(300), "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "mpath" character varying DEFAULT '', "parentId" integer, CONSTRAINT "PK_c22adcb15e7de70e1a74b4a3542" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "user_id" integer`);
//        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
  //      await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_category" ADD CONSTRAINT "FK_c9be8eeff60a6ef9835a213b6da" FOREIGN KEY ("parentId") REFERENCES "user_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d92cea99435198564d99f796580" FOREIGN KEY ("category_id") REFERENCES "user_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD CONSTRAINT "FK_2b850bf3117d0f00760dcdef0dd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_registration" DROP CONSTRAINT "FK_2b850bf3117d0f00760dcdef0dd"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d92cea99435198564d99f796580"`);
        await queryRunner.query(`ALTER TABLE "user_category" DROP CONSTRAINT "FK_c9be8eeff60a6ef9835a213b6da"`);
        await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "page" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "category_id"`);
        await queryRunner.query(`DROP TABLE "user_category"`);
    }

}
