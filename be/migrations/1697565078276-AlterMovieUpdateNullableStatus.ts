import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterMovieUpdateNullableStatus1697565078276 implements MigrationInterface {
    name = 'AlterMovieUpdateNullableStatus1697565078276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "adult" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "status" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "adult" DROP DEFAULT`);
    }

}
