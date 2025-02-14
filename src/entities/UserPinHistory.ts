import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { UserPin } from "./UserPin";

@Entity()
export class UserPinHistory {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    userid!: string;

    @Column()
    userPinId!: string;

    @Column({ type: "varchar", length: 6 })
    pin!: string;

    @CreateDateColumn()
    createdTime!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userid" })
    user!: User;

    @ManyToOne(() => UserPin)
    @JoinColumn({ name: "userPinId" })
    userPin!: UserPin;
}
