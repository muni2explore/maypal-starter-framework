import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStickerItemTypeTable1737087570139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_item_type",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "type", type: "varchar", isNullable: false },
                    { name: "icon", type: "varchar", isNullable: false },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_item_type");
    }

}
