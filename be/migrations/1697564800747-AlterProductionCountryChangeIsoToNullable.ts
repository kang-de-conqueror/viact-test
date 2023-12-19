import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterProductionCountryChangeIsoToNullable1697564800747 implements MigrationInterface {
    name = 'AlterProductionCountryChangeIsoToNullable1697564800747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "production_country" ALTER COLUMN "iso_3166_1" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "production_country" ALTER COLUMN "iso_3166_1" SET NOT NULL`);
    }

}
