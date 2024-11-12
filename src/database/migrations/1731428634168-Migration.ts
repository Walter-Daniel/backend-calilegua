import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731428634168 implements MigrationInterface {
    name = 'Migration1731428634168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ADD "totalPrice" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "totalPrice"`);
    }

}
