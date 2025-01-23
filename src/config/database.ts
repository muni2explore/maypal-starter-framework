import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { UserType } from "../entities/UserType";
import { UserProfile } from "../entities/UserProfile";
import { UserPin } from "../entities/UserPin";
import { UserPinHistory } from "../entities/UserPinHistory";
import { VerificationCode } from "../entities/VerificationCode";
import { ContactUs } from "../entities/ContactUs";
import { StickerType } from "../entities/StickerType";
import { StickerStatus } from "../entities/StickerStatus";
import { Sticker } from "../entities/Sticker";
import { StickerItemType } from "../entities/StickerItemType";
import { StickerCallType } from "../entities/StickerCallType";
import { StickerProperty } from "../entities/StickerProperty";
import { StickerMap } from "../entities/StickerMap";
import { StickerUserType } from "../entities/StickerUserType";
import { StickerUserStatus } from "../entities/StickerUserStatus";
import { StickerUser } from "../entities/StickerUser";
import { StickerScheduleTemplate } from "../entities/StickerScheduleTemplate";
import { StickerSchedule } from "../entities/StickerSchedule";
import { MapPalCall } from "../entities/MapPalCall";
import { MapPalVideoCall } from "../entities/MapPalVideoCall";
import { MapPalMessage } from "../entities/MapPalMessage";
import { Faq } from "../entities/Faq";
import { TermType } from "../entities/TermType";
import { Term } from "../entities/Term";
import { Feedback } from "../entities/Feedback";
import { Licence } from "../entities/Licence";
import { UserLicence } from "../entities/UserLicence";
import { UserStatus } from "../entities/UserStatus";
import { config } from "./environment";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  synchronize: false,
  logging: config.database.logging,
  entities: [User, UserStatus, UserType, UserProfile, UserPin, UserPinHistory, VerificationCode ,ContactUs, StickerType, StickerStatus, Sticker, StickerItemType, StickerCallType, StickerProperty, StickerMap, StickerUserType, StickerUserStatus, StickerUser, StickerScheduleTemplate, StickerSchedule, MapPalCall, MapPalVideoCall, MapPalMessage, Faq, TermType, Term, Feedback, Licence, UserLicence ],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});