import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLicenceTable1737094003507 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "licence",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "plan", type: "varchar", length: "255", isNullable: false }, // 'premium', 'business', 'trial'
          { name: "isActive", type: "boolean", default: true },
          { name: "days", type: "int", isNullable: false },
          { name: "modifiedTime", type: "datetime", isNullable: true },
          { name: "modifiedBy", type: "varchar", length: "255", isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("licence");
  }
}
