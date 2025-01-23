import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserActivityLogTable1737494102730 implements MigrationInterface {
    name = 'AlterUserActivityLogTable1737494102730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_d54f841fa5478e4734590d44036"`);
        await queryRunner.query(`ALTER TABLE "activity_logs" ADD CONSTRAINT "UQ_d54f841fa5478e4734590d44036" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_d54f841fa5478e4734590d44036" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity_logs" DROP CONSTRAINT "FK_d54f841fa5478e4734590d44036"`);
        await queryRunner.query(`ALTER TABLE "activity_logs" DROP CONSTRAINT "UQ_d54f841fa5478e4734590d44036"`);
        await queryRunner.query(`ALTER TABLE "activity_logs" ADD CONSTRAINT "FK_d54f841fa5478e4734590d44036" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
