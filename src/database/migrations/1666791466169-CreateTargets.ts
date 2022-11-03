import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTargets1666791466169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "targets",
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
                        name: "category_id",
                        type: "varchar",
                    },
                    {
                        name: "user_id",
                        type: "varchar",
                    },
                    {
                        name: "target_amount",
                        type: "numeric",
                    },
                    {
                        name: "date_begin",
                        type: "date",
                    },
                    {
                        name: "date_end",
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
        await queryRunner.dropTable("targets");
    }

}
