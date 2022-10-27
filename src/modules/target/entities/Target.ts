import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../accounts/entities/User";
import { Category } from "./Category";

@Entity("targets")
class Target {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    description: string;

    @ManyToOne((): typeof Category => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @ManyToOne((): typeof User => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @Column("decimal", { precision: 11, scale: 2 })
    target_amount: number;

    @Column()
    date_begin: Date;

    @Column()
    date_end: Date;

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

export { Target };
