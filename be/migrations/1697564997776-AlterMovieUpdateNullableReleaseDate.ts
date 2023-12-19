import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateNullableReleaseDate1697564997776 implements MigrationInterface {
    name = 'AlterMovieUpdateNullableReleaseDate1697564997776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "release_date" SET NOT NULL`);
    }

}
