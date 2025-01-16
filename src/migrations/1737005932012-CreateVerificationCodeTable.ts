import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateVerificationCodeTable1737005932012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "verification_code",
            columns: [
                { name: "id", type: "char", length: "36", isPrimary: true, isNullable: false },
                { name: "phoneNumber", type: "varchar", isNullable: false },
                { name: "code", type: "varchar", isNullable: false },
                { name: "validFor", type: "int", isNullable: false, comment: "seconds" },
                { name: "active", type: "boolean", default: true },
                { name: "createdTime", type: "timestamp", default: "CURRENT_TIMESTAMP" },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("verification_code");
    }

}
