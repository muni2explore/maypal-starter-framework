import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStickerScheduleTable1737091308340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_schedule",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "stickerId", type: "char", length: "36", isNullable: false },
                    { name: "dayOfWeek", type: "int", isNullable: false },
                    { name: "startTime", type: "time", isNullable: false },
                    { name: "endTime", type: "time", isNullable: false },
                    { name: "isEnabledToConnect", type: "boolean", default: true },
                    { name: "isScheduleActive", type: "boolean", default: true },
                    { name: "templateId", type: "char", length: "36", isNullable: false },
                    { name: "createdBy", type: "varchar", isNullable: false },
                    { name: "createOn", type: "datetime", default: "CURRENT_TIMESTAMP" },
                    { name: "modifiedBy", type: "varchar", isNullable: false },
                    { name: "modifiedOn", type: "datetime", isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "sticker_schedule",
            new TableForeignKey({
                columnNames: ["stickerId"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "sticker_schedule",
            new TableForeignKey({
                columnNames: ["templateId"],
                referencedTableName: "sticker_schedule_template",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_schedule");
    }
}
