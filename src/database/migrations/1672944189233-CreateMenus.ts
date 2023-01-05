import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMenus1672944189233 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "menus",
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
                        name: "url",
                        type: "varchar",
                    },
                    {
                        name: "icon",
                        type: "varchar",
                    },
                    {
                        name: "admin_only",
                        type: "boolean",
                    },
                    {
                        name: "active",
                        type: "boolean",
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
        await queryRunner.dropTable("menus");
    }

}
