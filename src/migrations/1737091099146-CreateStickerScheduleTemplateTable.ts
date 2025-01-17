import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStickerScheduleTemplateTable1737091099146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_schedule_template",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_schedule_template");
    }
}
