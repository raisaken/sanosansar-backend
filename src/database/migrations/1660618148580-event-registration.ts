import {MigrationInterface, QueryRunner} from "typeorm";

export class eventRegistration1660618148580 implements MigrationInterface {
    name = 'eventRegistration1660618148580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "is_verified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "guardian_phone_number"`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "guardian_phone_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "guardian_phone_number"`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "guardian_phone_number" integer`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "event_registration" ADD "phone_number" integer`);
        await queryRunner.query(`ALTER TABLE "event_registration" DROP COLUMN "is_verified"`);
    }

}
