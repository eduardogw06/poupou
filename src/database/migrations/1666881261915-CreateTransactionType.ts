import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionType1666881261915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transaction_type",
                columns: [
                    {
                        name: "uuid",
                        type: "uuid",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transaction_type");
    }

}
