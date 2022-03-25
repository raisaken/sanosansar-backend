import {MigrationInterface, QueryRunner} from "typeorm";

export class gallary1648230489167 implements MigrationInterface {
    name = 'gallary1648230489167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gallary" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "title" character varying(30), "description" character varying(400), "type" character varying(50) NOT NULL DEFAULT 'image', "url" character varying(100) NOT NULL, CONSTRAINT "PK_519f5434e3877b4bf82360e102b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gallary"`);
    }

}
