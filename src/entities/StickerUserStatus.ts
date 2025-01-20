import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerUserStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: string;
}
