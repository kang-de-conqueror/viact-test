import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1697533620956 implements MigrationInterface {
    name = 'CreateTables1697533620956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genre" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "logo" character varying NOT NULL, "name" character varying NOT NULL, "origin_country" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_rating" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "user_id" integer NOT NULL, "move_id" integer NOT NULL, CONSTRAINT "PK_dc83344ac03519d58393e2e834a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "title" character varying NOT NULL, "language" character varying NOT NULL, "overview" character varying NOT NULL, "tag_line" character varying NOT NULL, "posterUrl" character varying NOT NULL, "release_date" TIMESTAMP NOT NULL, "revenue" integer NOT NULL, "budget" integer NOT NULL, "adult" boolean NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "user_rating"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
