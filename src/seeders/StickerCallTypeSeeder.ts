import { DataSource } from "typeorm";
import { StickerCallType } from "../entities/StickerCallType"; // Ensure the correct path to StickerCallType entity

export class StickerCallTypeSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerCallType);

    const stickerCallTypes = [
      { type: "Alltime" },
      { type: "Scheduled" },
      { type: "Emergency" },
      { type: "Custom" },
      { type: "Instant" },
      { type: "Recurring" },
      { type: "Manual" },
      { type: "Automatic" },
    ];

    for (const callType of stickerCallTypes) {
      const exists = await repository.findOneBy({ type: callType.type });
      if (!exists) {
        const stickerCallType = repository.create(callType);
        await repository.save(stickerCallType);
      }
    }

    console.log("StickerCallTypeSeeder: Seeded data successfully.");
  }
}
