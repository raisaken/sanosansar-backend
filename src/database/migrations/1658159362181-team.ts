import {MigrationInterface, QueryRunner} from "typeorm";

export class team1658159362181 implements MigrationInterface {
    name = 'team1658159362181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "name" character varying(50) NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(1000), "image" character varying(300), "slug" character varying(100), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "name" character varying(50) NOT NULL, "description" character varying(700), "position" character varying(70), "order" integer NOT NULL DEFAULT '0', "phone_number" bigint, "email" character varying(30), "facebook_link" character varying(300), "twitter_link" character varying(300), "instagram_link" character varying(300), "image" character varying(300), "slug" character varying(100), CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event_score" ADD CONSTRAINT "FK_673fed7073ff6a271adef56ca3d" FOREIGN KEY ("judge_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_score" DROP CONSTRAINT "FK_673fed7073ff6a271adef56ca3d"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "page"`);
    }

}
