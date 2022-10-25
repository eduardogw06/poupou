import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../../modules/accounts/entities/User";

export class InsertUserAdmin1661362262942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
        const passwordHash = await hash(ADMIN_PASSWORD, 8);

        await queryRunner
            .manager.save(
                queryRunner.manager.create<User>(User, {
                    name: 'Admin',
                    email: ADMIN_EMAIL,
                    password: passwordHash,
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
