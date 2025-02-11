import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Sticker } from "./Sticker";
import { StickerItemType } from "./StickerItemType";
import { StickerCallType } from "./StickerCallType";

@Entity()
export class StickerProperty {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  stickerName!: string;

  @Column({ type: "uuid" }) 
  stickerId!: string;

  @OneToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column({ default: 4 })
  maximumUsers!: number;

  @Column({ length: 6 })
  stickerPin!: string;
  
  @Column({ type: "int" }) 
  itemTypeId!: number;

  @ManyToOne(() => StickerItemType)
  @JoinColumn({ name: "itemTypeId" })
  stickerItemType!: StickerItemType;

  @Column({ type: "int" }) 
  callTypeId!: number; 

  @ManyToOne(() => StickerCallType)
  @JoinColumn({ name: "callTypeId" })
  stickerCallType!: StickerCallType;

  @Column({ nullable: true })
  helpText1!: string;

  @Column({ nullable: true })
  helpText2!: string;

  @Column()
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
