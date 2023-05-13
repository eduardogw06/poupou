import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'text',
    nullable: true
  })
  photo: string | null;

  @Column({
    type: 'text',
    nullable: true
  })
  google_id: string | null;

  @Column()
  is_admin: boolean;

  @Column()
  dark_theme: boolean;

  @Column()
  password_changed: Date

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

export { User };
