import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserTable1737527774220 implements MigrationInterface {
    name = 'AlterUserTable1737527774220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firstName" TO "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL DEFAULT "Lastname"`);
    }

}
