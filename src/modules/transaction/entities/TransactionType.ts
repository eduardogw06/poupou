import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("transaction_type")
class TransactionType {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    description: string;

    constructor() {
        if (!this.uuid) {
            this.uuid = uuidV4();
        }
    }
}

export { TransactionType };
