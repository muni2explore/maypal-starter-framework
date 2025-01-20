import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class StickerScheduleTemplate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
}
