import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStickerUserTable1737090506933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_user",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "sticker", type: "char", length: "36", isNullable: false },
                    { name: "userType", type: "int", isNullable: false },
                    { name: "userDescription", type: "varchar", isNullable: false },
                    { name: "mapCode", type: "char", length: "36", isNullable: false },
                    { name: "userId", type: "char", length: "36", isNullable: false },
                    { name: "isActive", type: "boolean", default: true },
                    { name: "status", type: "int", isNullable: false },
                    { name: "createdBy", type: "varchar", isNullable: false },
                    { name: "createOn", type: "datetime", default: "CURRENT_TIMESTAMP" },
                    { name: "modifiedBy", type: "varchar", isNullable: false },
                    { name: "modifiedOn", type: "datetime", isNullable: true },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["status"],
                referencedTableName: "sticker_user_status",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["sticker"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["userType"],
                referencedTableName: "sticker_user_type",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",  
                onUpdate: "CASCADE",  
            })
        );

        await queryRunner.createForeignKey(
            "sticker_user",
            new TableForeignKey({
                columnNames: ["mapCode"],
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