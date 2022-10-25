import { MigrationInterface, QueryRunner } from "typeorm";
import { Category } from "../../modules/target/entities/Category";

export class InsertCategories1666707780017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager.save(
                queryRunner.manager.create<Category>(Category,
                    [
                        {
                            description: 'Férias',
                            active: true,
                            icon: 'island-tropical'
                        },
                        {
                            description: 'Viagem',
                            active: true,
                            icon: 'plane'
                        },
                        {
                            description: 'Celular',
                            active: true,
                            icon: 'mobile'
                        },
                        {
                            description: 'Motivos médicos',
                            active: true,
                            icon: 'suitcase-medical'
                        },
                        {
                            description: 'Presente',
                            active: true,
                            icon: 'gift'
                        },
                        {
                            description: 'Casa',
                            active: true,
                            icon: 'house'
                        },
                        {
                            description: 'Estudos',
                            active: true,
                            icon: 'graduation-cap'
                        },
                    ]
                )
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM categories`);
    }

}
