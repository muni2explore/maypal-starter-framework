import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerItemType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  icon!: string;
}
