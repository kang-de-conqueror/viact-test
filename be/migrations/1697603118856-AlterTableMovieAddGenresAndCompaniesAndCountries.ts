import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieAddGenresAndCompaniesAndCountries1697603118856 implements MigrationInterface {
    name = 'AlterTableMovieAddGenresAndCompaniesAndCountries1697603118856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "genres" jsonb`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "production_companies" jsonb`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "production_countries" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "production_countries"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "production_companies"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "genres"`);
    }

}
