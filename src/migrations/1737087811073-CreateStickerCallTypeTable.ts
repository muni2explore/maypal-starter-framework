import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStickerCallTypeTable1737087811073 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_call_type",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "type", type: "varchar", isNullable: false },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_call_type");
    }

}
