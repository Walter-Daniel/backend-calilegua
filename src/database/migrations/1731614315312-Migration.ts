import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731614315312 implements MigrationInterface {
    name = 'Migration1731614315312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_da883f8d02581a40e6059bd7b38"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_9e409590b1fd14ff33711c4953f"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "manufacturerId" TO "manufacturer_id "`);
        await queryRunner.query(`CREATE TABLE "products_caregory" ("category_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_d670b9dd73649fbe9474a67b07f" PRIMARY KEY ("category_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_04d046f4280f81a1cc1cf25e16" ON "products_caregory" ("category_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_37c041e45d6528ce419e5c0b6e" ON "products_caregory" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "REL_9e409590b1fd14ff33711c4953"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP COLUMN "purchaserId"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD "purchaser_id" uuid`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "UQ_01dc73c5040e7434dec96130d12" UNIQUE ("purchaser_id")`);
        await queryRunner.query(`ALTER TABLE "operator" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."operator_role_enum" AS ENUM('admin', 'manager', 'staff')`);
        await queryRunner.query(`ALTER TABLE "operator" ADD "role" "public"."operator_role_enum" NOT NULL DEFAULT 'staff'`);
        await queryRunner.query(`CREATE INDEX "IDX_b3234b06e4d16f52b384dfa4dd" ON "product" ("price") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_2d90a77345d63238e6808ea1c7a" FOREIGN KEY ("manufacturer_id ") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_01dc73c5040e7434dec96130d12" FOREIGN KEY ("purchaser_id") REFERENCES "purchaser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_caregory" ADD CONSTRAINT "FK_04d046f4280f81a1cc1cf25e165" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_caregory" ADD CONSTRAINT "FK_37c041e45d6528ce419e5c0b6e1" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_caregory" DROP CONSTRAINT "FK_37c041e45d6528ce419e5c0b6e1"`);
        await queryRunner.query(`ALTER TABLE "products_caregory" DROP CONSTRAINT "FK_04d046f4280f81a1cc1cf25e165"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_01dc73c5040e7434dec96130d12"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_2d90a77345d63238e6808ea1c7a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3234b06e4d16f52b384dfa4dd"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."operator_role_enum"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD "role" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "UQ_01dc73c5040e7434dec96130d12"`);
        await queryRunner.query(`ALTER TABLE "operator" DROP COLUMN "purchaser_id"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD "purchaserId" uuid`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "REL_9e409590b1fd14ff33711c4953" UNIQUE ("purchaserId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37c041e45d6528ce419e5c0b6e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_04d046f4280f81a1cc1cf25e16"`);
        await queryRunner.query(`DROP TABLE "products_caregory"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "manufacturer_id " TO "manufacturerId"`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_9e409590b1fd14ff33711c4953f" FOREIGN KEY ("purchaserId") REFERENCES "purchaser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_da883f8d02581a40e6059bd7b38" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
