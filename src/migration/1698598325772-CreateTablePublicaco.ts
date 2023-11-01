import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePublicaco1698598325772 implements MigrationInterface {
  name = 'CreateTablePublicaco1698598325772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."publicacao_categoria_enum" AS ENUM('Saúde', 'Alimentação', 'Exercícios', 'Geral')`,
    );
    await queryRunner.query(
      `CREATE TABLE "publicacao" ("id" SERIAL NOT NULL, "idUsuario" integer NOT NULL, "titulo" character varying(100) NOT NULL, "descricao" character varying(500) NOT NULL, "dataHora" TIMESTAMP NOT NULL, "categoria" "public"."publicacao_categoria_enum" NOT NULL DEFAULT 'Geral', "contagemReportes" integer NOT NULL, CONSTRAINT "PK_f4dc301bbbc0b88ada0ab956f5a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "publicacao"`);
    await queryRunner.query(`DROP TYPE "public"."publicacao_categoria_enum"`);
  }
}
