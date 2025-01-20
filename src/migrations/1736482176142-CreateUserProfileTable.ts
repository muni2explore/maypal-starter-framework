import { MigrationInterface, QueryRunner, Table ,TableForeignKey} from "typeorm";

export class CreateUserProfileTable1736482176142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: "user_profile",
            columns: [
            { name: "id",  type: "char", length: "36",isPrimary: true, isNullable: false },
            { name: "userid", type: "char", length: "36"  },
            { name: "integer", type: "int" },
            { name: "firstName", type: "varchar" },
            { name: "lastName", type: "varchar" },
            { name: "emailAddress", type: "varchar" },
            { name: "password", type: "varchar" },
            { name: "userLocale", type: "varchar", length: "10" },
            { name: "createdTime", type: "timestamp", default: "CURRENT_TIMESTAMP"},
            { name: "modifiedTime", type: "timestamp", default: "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"  },
            { name: "modifiedBy", type: "varchar" },
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
            columnNames: ["integer"],
            referencedTableName: "user_type",
            referencedColumnNames: ["integer"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_profile");
    }

}
