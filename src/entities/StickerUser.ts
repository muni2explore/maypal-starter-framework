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

  @Column({ type: "uuid" }) 
  stickerId!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column({ type: "int" }) 
  userTypeId!: number;

  @ManyToOne(() => StickerUserType)
  @JoinColumn({ name: "userTypeId" })
  userType!: StickerUserType;

  @Column()
  userDescription!: string;

  @Column({ type: "uuid" }) 
  mapId!: string;

  @ManyToOne(() => StickerMap)
  @JoinColumn({ name: "mapId" })
  mapCode!: StickerMap;

  @Column({ type: "uuid" }) 
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: "int" }) 
  statusId!: number;

  @ManyToOne(() => StickerUserStatus)
  @JoinColumn({ name: "statusId" })
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
