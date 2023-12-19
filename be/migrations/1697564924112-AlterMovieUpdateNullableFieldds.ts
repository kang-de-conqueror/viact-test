import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateNullableFieldds1697564924112 implements MigrationInterface {
    name = 'AlterMovieUpdateNullableFieldds1697564924112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "popularity" TYPE numeric(10)`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "popularity" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "tag_line" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "revenue" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "revenue" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "budget" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "budget" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "runtime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "runtime" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "video" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "vote_average" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "voteCount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "voteCount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "vote_average" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "video" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "runtime" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "runtime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "budget" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "budget" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "revenue" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "revenue" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "tag_line" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "poster_path" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "popularity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "popularity" TYPE numeric(10,0)`);
    }

}
