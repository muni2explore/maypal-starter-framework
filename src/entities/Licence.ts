import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Licence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  plan!: string;  

  @Column("boolean", { default: true })
  isActive!: boolean;

  @Column("int")
  days!: number;  

  @Column("datetime")
  modifiedTime!: Date;

  @Column("varchar")
  modifiedBy!: string;
}
