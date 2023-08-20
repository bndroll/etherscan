import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlockAndWalletEntities1692554970204 implements MigrationInterface {
    name = 'CreateBlockAndWalletEntities1692554970204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block_wallet" ("id" uuid NOT NULL, "blockNumber" character varying NOT NULL, "wallet" character varying NOT NULL, "value" numeric(22,0) NOT NULL, CONSTRAINT "PK_a8b4de5b6434ee12123b957dc86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "block" ("number" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38414873c187a3e0c7943bc4c7b" PRIMARY KEY ("number"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "block"`);
        await queryRunner.query(`DROP TABLE "block_wallet"`);
    }

}
