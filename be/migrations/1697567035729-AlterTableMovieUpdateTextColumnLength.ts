import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieUpdateTextColumnLength1697567035729 implements MigrationInterface {
    name = 'AlterTableMovieUpdateTextColumnLength1697567035729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "original_title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "original_title" character varying`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "title" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "original_title"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "original_title" character varying(100)`);
    }

}
