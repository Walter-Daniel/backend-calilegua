import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731617411807 implements MigrationInterface {
    name = 'Migration1731617411807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchaser" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchaser" ADD CONSTRAINT "CHK_26d37269b76dd74ec3a315114a" CHECK ("age" >= 18)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchaser" DROP CONSTRAINT "CHK_26d37269b76dd74ec3a315114a"`);
        await queryRunner.query(`ALTER TABLE "purchaser" DROP COLUMN "age"`);
    }

}
