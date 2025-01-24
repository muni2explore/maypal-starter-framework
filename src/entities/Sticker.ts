import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StickerType } from "./StickerType";
import { StickerStatus } from "./StickerStatus";

@Entity()
export class Sticker {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "int" }) 
  type!: number;

  @ManyToOne(() => StickerType, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "type" })
  stickerType!: StickerType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 12 })
  stickerCode!: string;

  @Column({ type: "int" }) 
  status!: number;

  @ManyToOne(() => StickerStatus, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "status" })
  stickerStatus!: StickerStatus;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column()
  modifiedBy?: string;

  @UpdateDateColumn()
  modifiedOn!: Date;
}
