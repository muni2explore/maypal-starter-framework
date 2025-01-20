import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Sticker } from "./Sticker";
import { StickerUserStatus } from "./StickerUserStatus";
import { StickerUserType } from "./StickerUserType";
import { StickerMap } from "./StickerMap";
import { User } from "./User";

@Entity()
export class StickerUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "sticker" })
  sticker!: Sticker;

  @ManyToOne(() => StickerUserType)
  @JoinColumn({ name: "userType" })
  userType!: StickerUserType;

  @Column()
  userDescription!: string;

  @ManyToOne(() => StickerMap)
  @JoinColumn({ name: "mapCode" })
  mapCode!: StickerMap;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  userId!: User;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => StickerUserStatus)
  @JoinColumn({ name: "status" })
  status!: StickerUserStatus;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column()
  modifiedBy!: string;

  @UpdateDateColumn()
  modifiedOn!: Date;
}
