import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  question!: string;

  @Column("text")
  answer!: string;

  @Column("varchar")
  category!: string;

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
