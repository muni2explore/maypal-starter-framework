import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn  } from "typeorm";
import { UserStatus } from "./UserStatus";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userid!: string;

  @Column()
  countryCode!: number;

  @Column({ unique: true })
  phoneNumber!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: "int", default: 1 })
  userStatus!: number;

  @ManyToOne(() => UserStatus)
  @JoinColumn({ name: "userStatus" })
  userStatusId!: UserStatus;

}
