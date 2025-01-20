import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";  

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  user!: User;  

  @Column("int")
  rating!: number;

  @Column("text")
  feedback!: string;

  @Column("datetime")
  createdTime!: Date;

  @Column("varchar")
  createdBy!: string;

  @Column("datetime")
  modifiedTime!: Date;

  @Column("varchar")
  modifiedBy!: string;

  @Column("boolean", { default: true })
  isActive!: boolean;
}
