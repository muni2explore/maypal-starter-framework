import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Sticker } from "./Sticker";
import { StickerItemType } from "./StickerItemType";
import { StickerCallType } from "./StickerCallType";

@Entity()
export class StickerProperty {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  stickerName!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column()
  maximumUsers!: number;

  @Column({ length: 6 })
  stickerPin!: string;

  @ManyToOne(() => StickerItemType)
  @JoinColumn({ name: "type" })
  type!: StickerItemType;

  @ManyToOne(() => StickerCallType)
  @JoinColumn({ name: "callType" })
  callType!: StickerCallType;

  @Column({ nullable: true })
  helpText1!: string;

  @Column({ nullable: true })
  helpText2!: string;

  @Column()
  itemType!: number;

  @Column({ type: "text", nullable: true })
  automaticReply!: string;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column({ nullable: true })
  modifiedBy!: string;

  @UpdateDateColumn({ nullable: true })
  modifiedOn!: Date;
}
