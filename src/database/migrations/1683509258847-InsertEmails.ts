import { MigrationInterface, QueryRunner } from "typeorm";
import { Email } from "../../modules/system/entities/Email";

export class InsertEmails1683509258847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
            .manager.save(
                queryRunner.manager.create<Email>(Email, [
                    {
                        uuid: process.env.NEW_USER_EMAIL,
                        description: 'Novo cadastro',
                        warning: 'Este e-mail será enviado após o cadastro do usuário, se atente nisso ao editar o conteúdo desta mensagem.',
                        subject: 'Bem-vindo(a) ao Sistema Poupou',
                        content: 'Olá, [name]. Seja muito bem-vindo ao Sistema Poupou, o seu cofre virtual. Comece agora mesmo a investir nos seus sonhos! Cadastre um novo objetivo e o gerencie pelo nosso sistema.',
                        active: true
                    },
                    {
                        uuid: process.env.NEW_TARGET_EMAIL,
                        description: 'Novo objetivo',
                        warning: 'Este e-mail será enviado após o cadastro de um novo objetivo, se atente nisso ao editar o conteúdo desta mensagem.',
                        subject: 'Novo objetivo cadastrado',
                        content: 'Olá, [name]. Ficamos muito felizes em ter você conosco. O objetivo [target_name] foi cadastrado com sucesso e aguarda o seu primeiro investimento. Economize e invista no seu sonho.',
                        active: true
                    },
                    {
                        uuid: process.env.NEW_TRANSACTION_EMAIL,
                        description: 'Novo aporte',
                        warning: 'Este e-mail será enviado após o cadastro de um novo aporte, se atente nisso ao editar o conteúdo desta mensagem.',
                        subject: 'Novo aporte cadastrado',
                        content: 'Tem dinheiro pingando no objetivo [target_name]! Você acaba de aportar [transaction_amount] e está cada vez mais perto de alcançar seu sonho.',
                        active: true
                    },
                ]
                )
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}


