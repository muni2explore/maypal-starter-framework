import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserStatusTable1737610277200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_status",
                columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "status", type: "varchar", isNullable: false },
                { name: "createdAt", type: "datetime", default: "CURRENT_TIMESTAMP" },
                { name: "updatedAt", type: "datetime", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_status");
    }

}
