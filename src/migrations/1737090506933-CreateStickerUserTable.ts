import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStickerUserTable1737090506933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_user",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "stickerId", type: "char", length: "36", isNullable: false },
                    { name: "userTypeId", type: "int", isNullable: false },
                    { name: "userDescription", type: "varchar", isNullable: false },
                    { name: "mapId", type: "char", length: "36", isNullable: false },
                    { name: "userId", type: "char", length: "36", isNullable: false },
                    { name: "isActive", type: "boolean", default: true },
                    { name: "statusId", type: "int", isNullable: false },
                    { name: "createdBy", type: "varchar", isNullable: false },
                    { name: "createOn", type: "datetime", default: "CURRENT_TIMESTAMP" },
                    { name: "modifiedBy", type: "varchar", isNullable: true },
                    { name: "modifiedOn", type: "datetime", isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["statusId"],
                referencedTableName: "sticker_user_status",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["stickerId"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["userTypeId"],
                referencedTableName: "sticker_user_type",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["mapId"],
                referencedTableName: "sticker_map",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedTableName: "user",
                referencedColumnNames: ["userid"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_user");
    }
}