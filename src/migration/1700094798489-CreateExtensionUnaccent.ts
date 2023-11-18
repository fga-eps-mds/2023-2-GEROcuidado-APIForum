import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateExtensionUnaccent1700094798489 implements MigrationInterface {
  name = 'CreateExtensionUnaccent1700094798489';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
       `CREATE EXTENSION unaccent`,
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
       `DROP EXTENSION if exists unaccent`,
      );
    }

}
