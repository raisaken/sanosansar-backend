import {MigrationInterface, QueryRunner} from "typeorm";

export class event1646330392544 implements MigrationInterface {
    name = 'event1646330392544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_registration" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "first_name" character varying(30) NOT NULL, "middle_name" character varying(30), "last_name" character varying(30) NOT NULL, "email" character varying(30), "phone_number" integer, "guardian_name" character varying(30) NOT NULL, "guardian_phone_number" integer, "school_name" character varying(100), "event_id" integer, CONSTRAINT "PK_10aedff1bd0d0ef534d1106ddec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_question" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "question_id" integer, "event_id" integer, CONSTRAINT "PK_2a27496f199e251b8071b8e2b98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_competition" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "time_spent" integer, "user_id" integer, "event_id" integer, "option_id" integer, "question_id" integer, CONSTRAINT "PK_73adeda4a7b6b86b5800551c996" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD CONSTRAINT "FK_d42836e8ed00e2586af913934a6" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_question" ADD CONSTRAINT "FK_35dd7863a1beb82c6dce29c8cac" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_question" ADD CONSTRAINT "FK_67444b4a0b0376e1250c529ddf4" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_competition" ADD CONSTRAINT "FK_0aae634ee8c9c8c8cf29a3cd2ac" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_competition" DROP CONSTRAINT "FK_0aae634ee8c9c8c8cf29a3cd2ac"`);
        await queryRunner.query(`ALTER TABLE "event_question" DROP CONSTRAINT "FK_67444b4a0b0376e1250c529ddf4"`);
        await queryRunner.query(`ALTER TABLE "event_question" DROP CONSTRAINT "FK_35dd7863a1beb82c6dce29c8cac"`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP CONSTRAINT "FK_d42836e8ed00e2586af913934a6"`);
        await queryRunner.query(`DROP TABLE "event_competition"`);
        await queryRunner.query(`DROP TABLE "event_question"`);
        await queryRunner.query(`DROP TABLE "event_registration"`);
    }

}
