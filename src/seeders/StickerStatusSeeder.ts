import { DataSource } from "typeorm";
import { StickerStatus } from "../entities/StickerStatus"; 

export class StickerStatusSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerStatus);

    const stickerStatuses = [
      { type: "Approved" },
      { type: "Removed" },
      { type: "Requested" },
      { type: "Created" },
    ];

    for (const status of stickerStatuses) {
      const exists = await repository.findOneBy({ type: status.type });
      if (!exists) {
        const stickerStatus = repository.create(status);
        await repository.save(stickerStatus);
      }
    }

    console.log("StickerStatusSeeder: Seeded data successfully.");
  }
}
