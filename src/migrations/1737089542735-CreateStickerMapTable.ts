import { MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStickerMapTable1737089542735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_map",
                columns: [
                    { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                    { name: "mapCode", type: "varchar", isNullable: false },
                    { name: "sticker", type: "char", length: "36", isNullable: false },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "sticker_map",
            new TableForeignKey({
                columnNames: ["sticker"],
                referencedTableName: "sticker",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_map");
    }
}
