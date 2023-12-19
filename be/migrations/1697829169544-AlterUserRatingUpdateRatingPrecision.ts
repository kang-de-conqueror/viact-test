import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRatingUpdateRatingPrecision1697829169544
  implements MigrationInterface
{
  name = 'AlterUserRatingUpdateRatingPrecision1697829169544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" ALTER COLUMN "rating" TYPE numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" ALTER COLUMN "rating" TYPE numeric(1,0)`,
    );
  }
}
