import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStickerUserStatusTable1737090173663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sticker_user_status",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
                    { name: "status", type: "varchar", isNullable: false },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sticker_user_status");
    }

}
