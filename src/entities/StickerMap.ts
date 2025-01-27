import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sticker } from "./Sticker";  

@Entity()
export class StickerMap {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  mapCode!: string;

  @Column({ type: "uuid" }) 
  stickerId!: string;

  
  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;
}
