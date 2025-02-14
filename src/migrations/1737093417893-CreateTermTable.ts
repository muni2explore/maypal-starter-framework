import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTermTable1737093417893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "term",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "typeId", type: "int", isNullable: false },
          { name: "title", type: "varchar", length: "255", isNullable: false },
          { name: "content", type: "text", isNullable: false },
          { name: "version", type: "int", isNullable: false },
          { name: "createdTime", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "createdBy", type: "varchar", length: "255", isNullable: false },
          { name: "modifiedTime", type: "datetime", isNullable: true },
          { name: "modifiedBy", type: "varchar", length: "255", isNullable: true },
          { name: "isActive", type: "boolean", default: true },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "term",
      new TableForeignKey({
        columnNames: ["typeId"],
        referencedTableName: "term_type",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",  
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("term");
  }
}
