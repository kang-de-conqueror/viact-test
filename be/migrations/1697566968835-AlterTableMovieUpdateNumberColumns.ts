import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieUpdateNumberColumns1697566968835 implements MigrationInterface {
    name = 'AlterTableMovieUpdateNumberColumns1697566968835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "vote_average"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "vote_average" numeric(10) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "vote_average"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "vote_average" integer NOT NULL DEFAULT '0'`);
    }

}
