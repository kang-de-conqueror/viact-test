import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableMovieUpdatePrimaryGeneratedColumn1697650166112 implements MigrationInterface {
    name = 'AlterTableMovieUpdatePrimaryGeneratedColumn1697650166112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "movie_id_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "movie_id_seq" OWNED BY "movie"."id"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "id" SET DEFAULT nextval('"movie_id_seq"')`);
    }

}
