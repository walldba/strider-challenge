import {MigrationInterface, QueryRunner} from "typeorm";

export class addContentNullable1656624197139 implements MigrationInterface {
    name = 'addContentNullable1656624197139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "content" SET NOT NULL`);
    }

}
