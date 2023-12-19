import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableMoveRemoveRelationsWithUserRating1697816273518
  implements MigrationInterface
{
  name = 'AlterTableMoveRemoveRelationsWithUserRating1697816273518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" DROP CONSTRAINT "FK_1f1beabe87d89674f3dae3cacc6"`,
    );
    await queryRunner.query(`ALTER TABLE "user_rating" DROP COLUMN "movieId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_rating" ADD "movieId" bigint`);
    await queryRunner.query(
      `ALTER TABLE "user_rating" ADD CONSTRAINT "FK_1f1beabe87d89674f3dae3cacc6" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
