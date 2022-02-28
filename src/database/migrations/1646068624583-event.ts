import {MigrationInterface, QueryRunner} from "typeorm";

export class event1646068624583 implements MigrationInterface {
    name = 'event1646068624583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "title" character varying(500) NOT NULL, "description" character varying(700), "meeting_link" character varying(300), "is_registration_open" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL DEFAULT 'DEBATE', "event_date" date, "starting_dtm" TIMESTAMP WITH TIME ZONE, "ending_dtm" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
