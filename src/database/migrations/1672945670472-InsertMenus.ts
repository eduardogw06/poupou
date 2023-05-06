import { MigrationInterface, QueryRunner } from "typeorm";
import { Menu } from "../../modules/system/entities/Menu";

export class InsertMenus1672945670472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager.save(
                queryRunner.manager.create<Menu>(Menu,
                    [
                        {
                            name: 'Meus objetivos',
                            url: '/meus-objetivos',
                            icon: 'piggy-bank',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Meus aportes',
                            url: '/meus-aportes',
                            icon: 'dollar',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Aportes automáticos',
                            url: '/aportes-automaticos',
                            icon: 'robot',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Perfil',
                            url: '/perfil',
                            icon: 'user',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Alterar Senha',
                            url: '/alterar-senha',
                            icon: 'key',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'E-mails',
                            url: '/emails',
                            icon: 'envelope',
                            admin_only: true,
                            active: true
                        },
                        {
                            name: 'Notificações',
                            url: '/notificacoes',
                            icon: 'bell',
                            admin_only: true,
                            active: true
                        },
                        {
                            name: 'Categorias',
                            url: '/categorias',
                            icon: 'list',
                            admin_only: true,
                            active: true
                        },

                    ]
                )
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
