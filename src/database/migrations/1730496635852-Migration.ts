import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730496635852 implements MigrationInterface {
    name = 'Migration1730496635852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(100) NOT NULL,
                CONSTRAINT "PK_product" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "manufacturer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                CONSTRAINT "PK_manufacturer" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "category" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                CONSTRAINT "PK_category" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
    }

}
