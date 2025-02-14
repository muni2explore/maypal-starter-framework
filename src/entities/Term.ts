import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TermType } from "./TermType";  

@Entity() 
export class Term {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" }) 
  typeId!: number;

  @ManyToOne(() => TermType)
  @JoinColumn({ name: "typeId" })
  type!: TermType;  

  @Column("varchar")
  title!: string;

  @Column("text")
  content!: string;

  @Column("int")
  version!: number;

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
