import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmails1683418204549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "emails",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "warning",
                        type: "varchar",
                    },
                    {
                        name: "subject",
                        type: "varchar",
                    },
                    {
                        name: "content",
                        type: "varchar",
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
        await queryRunner.dropTable("emails");
    }

}
