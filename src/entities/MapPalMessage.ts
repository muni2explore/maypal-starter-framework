import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sticker } from "./Sticker";

@Entity()
export class MapPalMessage {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column("datetime")
  createdTime!: Date;

  @Column("text")
  message!: string;
}
