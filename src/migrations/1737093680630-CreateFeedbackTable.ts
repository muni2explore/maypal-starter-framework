import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFeedbackTable1737093680630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "feedback",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "userid", type: "char", length: "36", isNullable: false },
          { name: "rating", type: "int", isNullable: false },
          { name: "feedback", type: "text", isNullable: false },
          { name: "createdTime", type: "datetime", default: "CURRENT_TIMESTAMP" },
          { name: "createdBy", type: "varchar", length: "255", isNullable: false },
          { name: "modifiedTime", type: "datetime", isNullable: true },
          { name: "modifiedBy", type: "varchar", length: "255", isNullable: true },
          { name: "isActive", type: "boolean", default: true },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "feedback",
      new TableForeignKey({
        columnNames: ["userid"],
        referencedTableName: "user",
        referencedColumnNames: ["userid"],
        onDelete: "CASCADE",  
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("feedback");
  }
}