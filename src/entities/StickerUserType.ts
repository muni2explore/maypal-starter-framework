import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerUserType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;
}
