import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Sticker } from "./Sticker";
import { StickerScheduleTemplate } from "./StickerScheduleTemplate";

@Entity()
export class StickerSchedule {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" }) 
  stickerId!: string;

  @ManyToOne(() => Sticker)
  @JoinColumn({ name: "stickerId" })
  sticker!: Sticker;

  @Column()
  dayOfWeek!: number;

  @Column("time")
  startTime!: string;

  @Column("time")
  endTime!: string;

  @Column()
  isEnabledToConnect!: boolean;

  @Column()
  isScheduleActive!: boolean;

  @ManyToOne(() => StickerScheduleTemplate)
  @JoinColumn({ name: "templateId" })
  templateId!: StickerScheduleTemplate;

  @Column()
  createdBy!: string;

  @CreateDateColumn()
  createOn!: Date;

  @Column()
  modifiedBy!: string;

  @UpdateDateColumn()
  modifiedOn!: Date;
}
