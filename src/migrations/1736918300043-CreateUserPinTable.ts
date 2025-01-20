import { MigrationInterface, QueryRunner ,Table, TableForeignKey } from "typeorm";

export class CreateUserPinTable1736918300043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_pin",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "userid", type: "char", length: "36", isNullable: false },
                    { name: "pin", type: "varchar", length: "6", isNullable: false },
                    { name: "expireAt", type: "date", isNullable: false },
                    { name: "createdTime", type: "timestamp", default: "CURRENT_TIMESTAMP" }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "user_pin",
            new TableForeignKey({
                columnNames: ["userid"],
                referencedTableName: "user",
                referencedColumnNames: ["userid"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable("user_pin");
    }

}
