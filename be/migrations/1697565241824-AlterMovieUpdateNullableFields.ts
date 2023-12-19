import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateNullableFields1697565241824 implements MigrationInterface {
    name = 'AlterMovieUpdateNullableFields1697565241824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "title" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "title" SET NOT NULL`);
    }

}
