import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730997802628 implements MigrationInterface {
    name = 'Migration1730997802628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "manufacturer" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "manufacturerId" uuid`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_da883f8d02581a40e6059bd7b38" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_da883f8d02581a40e6059bd7b38"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "manufacturerId"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "manufacturer" DROP COLUMN "createdAt"`);
    }

}
