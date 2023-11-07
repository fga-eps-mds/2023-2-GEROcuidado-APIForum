import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTablePublicacao1699307696816 implements MigrationInterface {
  name = 'AlterTablePublicacao1699307696816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publicacao" RENAME COLUMN "contagemReportes" TO "idUsuarioReporte"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publicacao" DROP COLUMN "idUsuarioReporte"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publicacao" ADD "idUsuarioReporte" integer array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "publicacao" DROP COLUMN "idUsuarioReporte"`,
    );
    await queryRunner.query(
      `ALTER TABLE "publicacao" ADD "idUsuarioReporte" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "publicacao" RENAME COLUMN "idUsuarioReporte" TO "contagemReportes"`,
    );
  }
}
