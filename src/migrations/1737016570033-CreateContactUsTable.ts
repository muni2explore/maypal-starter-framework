import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContactUsTable1737016570033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "contact_us",
            columns: [
                { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                { name: "phoneNumber", type: "varchar", isNullable: false },
                { name: "emailAddress", type: "varchar", isNullable: false },
                { name: "subject", type: "varchar", isNullable: false },
                { name: "message", type: "text", isNullable: false },
                { name: "userid", type: "char", length: "36", isNullable: true },
            ],
          })
        );

        await queryRunner.createForeignKey(
            "contact_us",
            new TableForeignKey({
                columnNames: ["userid"],
                referencedTableName: "user",
                referencedColumnNames: ["userid"],
                onDelete: "SET NULL",  
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contact_us");
    }

}
