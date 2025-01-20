import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { StickerType } from "./StickerType";
import { StickerStatus } from "./StickerStatus";

@Entity()
export class Sticker {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => StickerType, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "type" })
  type!: StickerType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 12 })
  stickerCode!: string;

  @ManyToOne(() => StickerStatus, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "status" })
  status!: StickerStatus;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column()
  modifiedBy?: string;

  @UpdateDateColumn()
  modifiedOn!: Date;
}
