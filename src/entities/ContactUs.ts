import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userid!: string;
  
  @Column()
  phoneNumber!: string;

  @Column()
  emailAddress!: string;

  @Column()
  subject!: string;

  @Column("text")
  message!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "userid" })
  user!: User | null; 
}
