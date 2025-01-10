import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1736244399705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
        name: "user",
        columns: [
          { name: "userid",  type: "char", length: "36", isPrimary: true, isNullable: false },
          { name: "countryCode", type: "int", isNullable: false },
          { name: "phoneNumber", type: "varchar", isNullable: false, isUnique: true },
          { name: "createdAt", type: "timestamp", default: "CURRENT_TIMESTAMP" },
          { name: "updatedAt", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" },
        ],
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
