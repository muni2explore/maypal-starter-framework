import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() 
export class TermType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  type!: string;  
}
