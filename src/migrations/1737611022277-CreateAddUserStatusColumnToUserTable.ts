import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class CreateAddUserStatusColumnToUserTable1737611022277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
            "user",
            new TableColumn({
                name: "userStatus",
                type: "int",
                default: 1,  
            })
        );

        await queryRunner.createForeignKey(
            "user",
            new TableForeignKey({
                columnNames: ["userStatus"],
                referencedTableName: "user_status",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE", 
                onUpdate: "CASCADE", 
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const foreignKey = await queryRunner.getTable("user").then((table) =>
            table?.foreignKeys.find((fk) => fk.columnNames.includes("user_status"))
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("user", foreignKey);
        }
        await queryRunner.dropColumn("user", "user_status");
    }
}
