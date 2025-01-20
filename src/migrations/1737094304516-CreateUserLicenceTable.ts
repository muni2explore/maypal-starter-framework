import { MigrationInterface, QueryRunner, Table, TableForeignKey  } from "typeorm";

export class CreateUserLicenceTable1737094304516 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_licence",
        columns: [
          { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
          { name: "userid", type: "char", length: "36", isNullable: false }, 
          { name: "plan", type: "int", isNullable: false }, 
          { name: "startDate", type: "date", isNullable: false },
          { name: "endDate", type: "date", isNullable: false },
          { name: "createdBy", type: "varchar", length: "255", isNullable: false },
          { name: "isActive", type: "boolean", default: true },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user_licence",
      new TableForeignKey({
        columnNames: ["userid"],
        referencedTableName: "user",
        referencedColumnNames: ["userid"],
        onDelete: "CASCADE",  
        onUpdate: "CASCADE", 
      })
    );

    await queryRunner.createForeignKey(
      "user_licence",
      new TableForeignKey({
        columnNames: ["plan"],
        referencedTableName: "licence",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",  
        onUpdate: "CASCADE", 
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_licence");
  }
}