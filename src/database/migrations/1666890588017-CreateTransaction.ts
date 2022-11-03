import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1666890588017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
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
                        name: "type_id",
                        type: "varchar",
                    },
                    {
                        name: "amount",
                        type: "numeric",
                    },
                    {
                        name: "date",
                        type: "date",
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
        await queryRunner.dropTable("transactions");
    }

}
