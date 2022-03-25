import {MigrationInterface, QueryRunner} from "typeorm";

export class contact1648226045320 implements MigrationInterface {
    name = 'contact1648226045320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "name" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "subject" character varying(100) NOT NULL, "messgae" character varying(400) NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_score" ("id" SERIAL NOT NULL, "event_id" integer, "score" integer, "remarks" character varying(400), "judge_id" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_5b43f40dee640ba7affb77e6951" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event_score" ADD CONSTRAINT "FK_df81904aa7ab799dbd40cd1dada" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_score" DROP CONSTRAINT "FK_df81904aa7ab799dbd40cd1dada"`);
        await queryRunner.query(`DROP TABLE "event_score"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
