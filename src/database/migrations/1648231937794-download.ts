import {MigrationInterface, QueryRunner} from "typeorm";

export class download1648231937794 implements MigrationInterface {
    name = 'download1648231937794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "download" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "title" character varying(30), "description" character varying(400), "type" character varying(50) NOT NULL DEFAULT 'image', "url" character varying(100) NOT NULL, "is_paid" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_84dcb3c6afdf8b2f9c0b8cd457f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "download"`);
    }

}
