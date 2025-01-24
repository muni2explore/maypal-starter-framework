import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { User } from "./User";
import { UserType } from "./UserType";
import * as bcrypt from "bcrypt";

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userid!: string;

  @Column({ default: 1 }) // Default to "Trial User"
  usertype!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  emailAddress!: string;

  @Column()
  password!: string;

  @Column({ length: 10, default: "en-UK" }) // Default locale to "en-UK"
  userLocale!: string;

  @CreateDateColumn()
  createdTime!: Date;

  @UpdateDateColumn()
  modifiedTime!: Date;

  @Column({ default: "mobileUser" }) // Default to "mobileUser"
  modifiedBy!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userid" })
  user!: User;

  @ManyToOne(() => UserType)
  @JoinColumn({ name: "usertype" })
  userType!: UserType;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}