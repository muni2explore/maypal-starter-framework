import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
}
