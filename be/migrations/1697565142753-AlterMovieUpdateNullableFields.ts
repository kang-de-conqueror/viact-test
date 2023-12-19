import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateNullableFields1697565142753 implements MigrationInterface {
    name = 'AlterMovieUpdateNullableFields1697565142753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "imdb_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "original_language" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "original_title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "overview" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "overview" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "original_title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "original_language" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "imdb_id" SET NOT NULL`);
    }

}
