import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMapPalCallTable1737091921642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "map_pal_call",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "stickerId", type: "char", length: "36", isNullable: false },
                    { name: "startedAt", type: "datetime", isNullable: false },
                    { name: "endedAt", type: "datetime", isNullable: false },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "map_pal_call",
            new TableForeignKey({
                columnNames: ["stickerId"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("map_pal_call");
    }
}
