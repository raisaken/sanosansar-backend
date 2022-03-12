import {MigrationInterface, QueryRunner} from "typeorm";

export class discussion1647054165331 implements MigrationInterface {
    name = 'discussion1647054165331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discussion" ("id" SERIAL NOT NULL, "title" character varying(50), "description" character varying(300), "media" jsonb, "is_active" boolean NOT NULL DEFAULT true, "is_verified" boolean NOT NULL DEFAULT true, "is_archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" character varying(300), "mpath" character varying DEFAULT '', "parentId" integer, CONSTRAINT "PK_b93169eb129e530c6a4c3b9fda1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discussion_like" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "discussion_id" integer, "user_id" integer, CONSTRAINT "PK_19242ab63f231e725dd249ded65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "discussion" ADD CONSTRAINT "FK_0587f72005cb289692e1e7c9f9e" FOREIGN KEY ("parentId") REFERENCES "discussion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discussion_like" ADD CONSTRAINT "FK_a2530555ec6d0be87cd540ae13f" FOREIGN KEY ("discussion_id") REFERENCES "discussion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discussion_like" ADD CONSTRAINT "FK_85f8f1055120fa1896460a91df3" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discussion_like" DROP CONSTRAINT "FK_85f8f1055120fa1896460a91df3"`);
        await queryRunner.query(`ALTER TABLE "discussion_like" DROP CONSTRAINT "FK_a2530555ec6d0be87cd540ae13f"`);
        await queryRunner.query(`ALTER TABLE "discussion" DROP CONSTRAINT "FK_0587f72005cb289692e1e7c9f9e"`);
        await queryRunner.query(`DROP TABLE "discussion_like"`);
        await queryRunner.query(`DROP TABLE "discussion"`);
    }

}
