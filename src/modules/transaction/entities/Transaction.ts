import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Target } from "../../target/entities/Target";
import { TransactionType } from "./TransactionType";

@Entity("transactions")
class Transaction {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ManyToOne((): typeof Target => Target)
    @JoinColumn({ name: "target_id" })
    target: Target;

    @Column()
    target_id: string;

    @ManyToOne((): typeof TransactionType => TransactionType)
    @JoinColumn({ name: "type_id" })
    transaction_type: TransactionType;

    @Column()
    type_id: string;

    @Column("decimal", { precision: 11, scale: 2 })
    amount: number;

    @Column()
    date: Date;

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

export { Transaction };
