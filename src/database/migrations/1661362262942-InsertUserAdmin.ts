import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from "../../modules/accounts/entities/User";

export class InsertUserAdmin1661362262942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner
        .manager.save(
            queryRunner.manager.create<User>(User, {
                name: 'Admin',
                email: 'eduardogw06@gmail.com',
                password: 'admin123',
                photo: null,
                google_id: null,
                is_admin: true,
                dark_theme: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
    }

}
