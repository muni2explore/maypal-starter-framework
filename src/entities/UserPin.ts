import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class UserPin {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userid!: string;

  @Column({ type: "varchar", length: 6 })
  pin!: string;

  @Column()
  expireAt!: string;

  @CreateDateColumn()
  createdTime!: Date;


  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  user!: User;

}
