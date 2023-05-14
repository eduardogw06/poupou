import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAutomaticInvestment1683993264867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "automatic_investments",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                    },
                    {
                        name: "target_id",
                        type: "varchar",
                    },
                    {
                        name: "amount",
                        type: "numeric",
                    },
                    {
                        name: "day",
                        type: "integer",
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
    }

}
