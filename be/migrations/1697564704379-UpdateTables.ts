import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTables1697564704379 implements MigrationInterface {
    name = 'UpdateTables1697564704379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "production_country" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" BIGSERIAL NOT NULL, "iso_3166_1" character varying NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_6a86ba61e51a719f7047f0b3842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "posterUrl"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "imdb_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "original_language" character varying(5) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "original_title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "popularity" numeric(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "poster_path" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "runtime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "video" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "vote_average" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "voteCount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_rating" ADD "rating" numeric(1) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_rating" ADD "timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "title" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "overview"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "overview" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_rating" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "user_rating" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "voteCount"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "vote_average"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "runtime"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "poster_path"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "popularity"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "original_title"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "original_language"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "imdb_id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "posterUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "language" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "production_country"`);
    }

}
