import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"; 
import { Licence } from "./Licence";

@Entity()
export class UserLicence {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  user!: User;  

  @ManyToOne(() => Licence)
  @JoinColumn({ name: "plan" })
  licence!: Licence;   

  @Column("date")
  startDate!: Date;

  @Column("date")
  endDate!: Date;

  @Column("varchar")
  createdBy!: string;

  @Column("boolean", { default: true })
  isActive!: boolean;
}
