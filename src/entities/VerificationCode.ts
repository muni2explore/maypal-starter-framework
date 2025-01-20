import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class VerificationCode {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  code!: string;

  @Column()
  validFor!: number;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @CreateDateColumn()
  createdTime!: Date;
}
