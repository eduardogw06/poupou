import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { User } from "../../modules/accounts/entities/User";

export class CreateUsers1661348035683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "photo",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "google_id",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "is_admin",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "dark_theme",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
