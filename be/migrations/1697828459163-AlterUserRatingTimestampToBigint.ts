import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserRatingTimestampToBigint1697828459163
  implements MigrationInterface
{
  name = 'AlterUserRatingTimestampToBigint1697828459163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(`ALTER TABLE "user_rating" ADD "timestamp" bigint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_rating" DROP COLUMN "timestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_rating" ADD "timestamp" integer NOT NULL`,
    );
  }
}
