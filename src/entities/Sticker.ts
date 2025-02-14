import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, JoinColumn ,OneToMany } from "typeorm";
import { StickerType } from "./StickerType";
import { StickerStatus } from "./StickerStatus";
import { StickerProperty } from "./StickerProperty";

@Entity()
export class Sticker {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: "int" }) 
  stickerTypeId!: number;

  @ManyToOne(() => StickerType, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "stickerTypeId" })
  stickerType!: StickerType;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "varchar", length: 12 })
  stickerCode!: string;

  @Column({ type: "int" }) 
  stickerStatusId!: number;

  @ManyToOne(() => StickerStatus, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "stickerStatusId" })
  stickerStatus!: StickerStatus;

  @OneToOne(() => StickerProperty, (stickerProperty) => stickerProperty.sticker)
  stickerProperties!: StickerProperty;


  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column()
  modifiedBy?: string;

  @UpdateDateColumn()
  modifiedOn!: Date;
}
