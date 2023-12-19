import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMovieAddRelationsToUserRating1697815709223
  implements MigrationInterface
{
  name = 'AlterTableMovieAddRelationsToUserRating1697815709223';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_rating" ADD "movieId" bigint`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ac69b597acc96479eeb1fb4e5a" ON "user_rating" ("user_id", "move_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_rating" ADD CONSTRAINT "FK_1f1beabe87d89674f3dae3cacc6" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" DROP CONSTRAINT "FK_1f1beabe87d89674f3dae3cacc6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac69b597acc96479eeb1fb4e5a"`,
    );
    await queryRunner.query(`ALTER TABLE "user_rating" DROP COLUMN "movieId"`);
  }
}
