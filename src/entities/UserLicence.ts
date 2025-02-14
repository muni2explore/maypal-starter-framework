import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"; 
import { Licence } from "./Licence";

@Entity()
export class UserLicence {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" }) 
  userid!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  user!: User;  

  @Column({ type: "int" }) 
  licenceId!: number;

  @ManyToOne(() => Licence)
  @JoinColumn({ name: "licenceId" })
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
