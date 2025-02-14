import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStickerTable1737086749634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false},
                    { name: "stickerTypeId", type: "int", isNullable: false },
                    { name: "isActive", type: "boolean", default: true },
                    { name: "stickerCode", type: "varchar", length: "12", isNullable: false, comment: "12 digit random string without special characters" },
                    { name: "stickerStatusId", type: "int", isNullable: false },
                    { name: "createdBy", type: "varchar", isNullable: false },
                    { name: "createOn", type: "datetime", default: "CURRENT_TIMESTAMP" },
                    { name: "modifiedBy", type: "varchar", isNullable: true },
                    { name: "modifiedOn", type: "datetime", isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "sticker",
            new TableForeignKey({
                columnNames: ["stickerTypeId"],
                referencedTableName: "sticker_type",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "sticker",
            new TableForeignKey({
                columnNames: ["stickerStatusId"],
                referencedTableName: "sticker_status",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker");
    }

}
