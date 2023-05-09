import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity('emails')
class Email {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    description: string;

    @Column()
    warning: string;

    @Column()
    subject: string;

    @Column()
    content: string;

    @Column()
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.uuid) {
            this.uuid = uuidV4();
        }
    }
}

export { Email }