import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateImdbIdToString1697566583888 implements MigrationInterface {
    name = 'AlterMovieUpdateImdbIdToString1697566583888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "imdb_id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "imdb_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "imdb_id"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "imdb_id" integer`);
    }

}
