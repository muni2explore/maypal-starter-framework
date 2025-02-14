import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFaqTable1737092876652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "faq",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "question", type: "text", isNullable: false },
                    { name: "answer", type: "text", isNullable: false },
                    { name: "category", type: "varchar", length: "255", isNullable: false },
                    { name: "createdTime", type: "datetime", isNullable: false },
                    { name: "createdBy", type: "varchar", length: "255", isNullable: false },
                    { name: "modifiedTime", type: "datetime", isNullable: true },
                    { name: "modifiedBy", type: "varchar", length: "255", isNullable: true },
                    { name: "isActive", type: "boolean", default: true },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("faq");
    }
}

