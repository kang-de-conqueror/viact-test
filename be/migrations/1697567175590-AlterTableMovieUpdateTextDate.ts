import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieUpdateTextDate1697567175590 implements MigrationInterface {
    name = 'AlterTableMovieUpdateTextDate1697567175590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" TIMESTAMP`);
    }

}
