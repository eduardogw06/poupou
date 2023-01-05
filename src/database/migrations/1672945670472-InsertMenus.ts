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
                            url: 'meus-objetivos',
                            icon: 'faPiggyBank',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Meus aportes',
                            url: 'meus-aportes',
                            icon: 'faDollar',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Aportes automáticos',
                            url: 'aportes-automaticos',
                            icon: 'faRobot',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Perfil',
                            url: 'perfil',
                            icon: 'faUser',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'Alterar Senha',
                            url: 'alterar-senha',
                            icon: 'faKey',
                            admin_only: false,
                            active: true
                        },
                        {
                            name: 'E-mails',
                            url: 'emails',
                            icon: 'faEnvelope',
                            admin_only: true,
                            active: true
                        },
                        {
                            name: 'Notificações',
                            url: 'notificacoes',
                            icon: 'faBell',
                            admin_only: true,
                            active: true
                        },
                        {
                            name: 'Categorias',
                            url: 'categorias',
                            icon: 'faList',
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
