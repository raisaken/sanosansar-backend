import {MigrationInterface, QueryRunner} from "typeorm";

export class user1645870274149 implements MigrationInterface {
    name = 'user1645870274149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quiz_registration" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "first_name" character varying(30) NOT NULL, "middle_name" character varying(30), "last_name" character varying(30) NOT NULL, "email" character varying(30), "phone_number" integer, "guardian_name" character varying(30) NOT NULL, "guardian_phone_number" integer, "school_name" character varying(100), "quiz_id" integer, CONSTRAINT "PK_d0cd0c2b2fa69f6277973bce62f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "title" character varying(500) NOT NULL, "description" character varying(700), "is_registration_open" boolean NOT NULL DEFAULT true, "quiz_date" date, "starting_dtm" TIMESTAMP WITH TIME ZONE, "ending_dtm" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_question" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "question_id" integer, "quiz_id" integer, CONSTRAINT "PK_0bab74c2a71b9b3f8a941104083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_competition" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "time_spent" integer, "user_id" integer, "question_id" integer, "option_id" integer, CONSTRAINT "PK_f526cf489747ecbd559d6ae3c69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "first_name" character varying(30) NOT NULL, "middle_name" character varying(30), "last_name" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "phone_number" integer, "password" character varying(300) NOT NULL, "role" character varying(30) NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "internal_comment" character varying(300), "token" character varying(700) NOT NULL DEFAULT 'USER', "expires" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying NOT NULL DEFAULT 'access', "blacklisted" boolean NOT NULL DEFAULT false, "user_id" integer, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD "time" character varying(30)`);
        await queryRunner.query(`ALTER TABLE "category" ADD "score" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "quiz_registration" ADD CONSTRAINT "FK_33e5f73307a9db2ae5b545bbede" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_c510aaf9edab26d9f7fdd924493" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_77e8e87d9e707fabdb82bf227fc" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_77e8e87d9e707fabdb82bf227fc"`);
        await queryRunner.query(`ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_c510aaf9edab26d9f7fdd924493"`);
        await queryRunner.query(`ALTER TABLE "quiz_registration" DROP CONSTRAINT "FK_33e5f73307a9db2ae5b545bbede"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "score"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "time"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "quiz_competition"`);
        await queryRunner.query(`DROP TABLE "quiz_question"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TABLE "quiz_registration"`);
    }

}
