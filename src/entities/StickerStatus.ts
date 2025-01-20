import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", comment: "Approved, Removed, Requested, Created" })
  type!: string;
}
