import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1730840296725 implements MigrationInterface {
    name = 'Migration1730840296725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operator" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(50) NOT NULL, "name" character varying(100), "lastname" character varying(100), "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaserId" uuid, CONSTRAINT "UQ_809228ed8520ca85998fe55165f" UNIQUE ("email"), CONSTRAINT "REL_9e409590b1fd14ff33711c4953" UNIQUE ("purchaserId"), CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchaser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "lastname" character varying(100) NOT NULL, "phone" character varying(20) NOT NULL, "email" character varying(100) NOT NULL, "address" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_06fa636ec51b05dc3b0c7ccfee6" UNIQUE ("email"), CONSTRAINT "PK_b7d2475ffd5e99670785569e7e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_9e409590b1fd14ff33711c4953f" FOREIGN KEY ("purchaserId") REFERENCES "purchaser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_9e409590b1fd14ff33711c4953f"`);
        await queryRunner.query(`DROP TABLE "purchaser"`);
        await queryRunner.query(`DROP TABLE "operator"`);
    }

}
