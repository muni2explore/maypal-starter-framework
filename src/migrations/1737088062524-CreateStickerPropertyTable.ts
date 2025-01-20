import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStickerPropertyTable1737088062524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_property",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "stickerName", type: "varchar", isNullable: false },
                    { name: "stickerId", type: "char", length: "36", isNullable: false },
                    { name: "maximumUsers", type: "int", isNullable: false },
                    { name: "stickerPin", type: "varchar", length: "6", isNullable: false },
                    { name: "type", type: "int", isNullable: false },
                    { name: "callType", type: "int", isNullable: false },
                    { name: "helpText1", type: "varchar", isNullable: true },
                    { name: "helpText2", type: "varchar", isNullable: true },
                    { name: "itemType", type: "int", isNullable: false },
                    { name: "automaticReply", type: "text", isNullable: true },
                    { name: "createdBy", type: "varchar", isNullable: false },
                    { name: "createOn", type: "datetime", default: "CURRENT_TIMESTAMP" },
                    { name: "modifiedBy", type: "varchar", isNullable: true },
                    { name: "modifiedOn", type: "datetime", isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "sticker_property",
            new TableForeignKey({
                columnNames: ["stickerId"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", 
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "sticker_property",
            new TableForeignKey({
                columnNames: ["type"],
                referencedTableName: "sticker_item_type",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", 
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "sticker_property",
            new TableForeignKey({
                columnNames: ["callType"],
                referencedTableName: "sticker_call_type",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", 
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_property");
    }

}
