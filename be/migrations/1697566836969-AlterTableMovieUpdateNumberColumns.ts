import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieUpdateNumberColumns1697566836969 implements MigrationInterface {
    name = 'AlterTableMovieUpdateNumberColumns1697566836969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "revenue"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "revenue" numeric(10) DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "budget"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "budget" numeric(10) DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "runtime"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "runtime" numeric(10) DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "runtime"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "runtime" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "budget"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "budget" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "revenue"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "revenue" integer DEFAULT '0'`);
    }

}
