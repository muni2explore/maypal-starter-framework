import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sticker } from "./Sticker";

@Entity()
export class MapPalVideoCall {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column("datetime")
  startedAt!: Date;

  @Column("datetime")
  endedAt!: Date;
}
