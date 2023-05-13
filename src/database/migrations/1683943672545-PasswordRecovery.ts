import { MigrationInterface, QueryRunner } from "typeorm";

export class PasswordRecovery1683943672545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users 
            ADD COLUMN password_changed TIMESTAMP DEFAULT NULL;`,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN password_changed;
        `);
    }

}
