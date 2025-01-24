import { MigrationInterface, QueryRunner, Table ,TableForeignKey} from "typeorm";

export class CreateUserProfileTable1736482176142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: "user_profile",
            columns: [
            { name: "id",  type: "char", length: "36",isPrimary: true, isNullable: false },
            { name: "userid", type: "char", length: "36"  },
            { name: "usertype", type: "int", isNullable: false, default: 1 },
            { name: "firstName", type: "varchar" },
            { name: "lastName", type: "varchar" },
            { name: "emailAddress", type: "varchar" },
            { name: "password", type: "varchar" },
            { name: "userLocale", type: "varchar", length: "10", isNullable: false, default: "'en-UK'" },
            { name: "createdTime", type: "timestamp", default: "CURRENT_TIMESTAMP"},
            { name: "modifiedTime", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"  },
            { name: "modifiedBy", type: "varchar", isNullable: false, default: "'mobileUser'" },
            ],
        })
        );

        await queryRunner.createForeignKey(
        "user_profile",
        new TableForeignKey({
            columnNames: ["userid"],
            referencedTableName: "user",
            referencedColumnNames: ["userid"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
        );

        await queryRunner.createForeignKey(
        "user_profile",
        new TableForeignKey({
            columnNames: ["usertype"],
            referencedTableName: "user_type",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_profile");
    }

}
