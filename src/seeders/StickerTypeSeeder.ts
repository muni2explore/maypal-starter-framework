import { DataSource } from "typeorm";
import { StickerType } from "../entities/StickerType";

export class StickerTypeSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerType);

    const stickerTypes = [
      { type: "static" },
      { type: "business" },
      { type: "personal" },
    ];

    for (const type of stickerTypes) {
      const exists = await repository.findOneBy({ type: type.type });
      if (!exists) {
        const stickerType = repository.create(type);
        await repository.save(stickerType);
      }
    }

    console.log("StickerTypeSeeder: Seeded data successfully.");
  }
}
