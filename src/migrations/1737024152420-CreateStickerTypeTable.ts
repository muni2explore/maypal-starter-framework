import { MigrationInterface, QueryRunner, Table  } from "typeorm";

export class CreateStickerTypeTable1737024152420 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_type",
                columns: [
                { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                { name: "type", type: "varchar", isNullable: false },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_type");
    }

}
