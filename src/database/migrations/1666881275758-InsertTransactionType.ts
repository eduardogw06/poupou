import { MigrationInterface, QueryRunner } from "typeorm";
import { TransactionType } from "../../modules/transaction/entities/TransactionType";

export class InsertTransactionType1666881275758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager.save(
                queryRunner.manager.create<TransactionType>(TransactionType,
                    [
                        {
                            description: 'Aporte',
                        },
                        {
                            description: 'Retirada',
                        },
                    ]
                )
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM transaction_type`);
    }

}
