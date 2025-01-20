import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserPinHistoryTable1737002510519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
            new Table({
                name: "user_pin_history",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true },
                    { name: "userid", type: "char", length: "36", isNullable: false },
                    { name: "userPinId", type: "char", length: "36", isNullable: false },
                    { name: "pin", type: "varchar", length: "6", isNullable: false },
                    { name: "createdTime", type: "timestamp", default: "CURRENT_TIMESTAMP" }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "user_pin_history",
            new TableForeignKey({
                columnNames: ["userid"],
                referencedTableName: "user",
                referencedColumnNames: ["userid"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "user_pin_history",
            new TableForeignKey({
                columnNames: ["userPinId"],
                referencedTableName: "user_pin",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_pin_history");
    }

}
