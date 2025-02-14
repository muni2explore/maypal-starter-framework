import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStickerStatusTable1737086458977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_status",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "type", type: "varchar", isNullable: false, comment: "Approved, Removed, Requested, Created" },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_status");
    }

}
