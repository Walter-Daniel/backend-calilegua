import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731286948350 implements MigrationInterface {
    name = 'Migration1731286948350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "address" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "email" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "image" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "stock" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "origin" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "image" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "origin"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "stock"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "name"`);
    }

}
