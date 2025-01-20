import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerCallType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
}
