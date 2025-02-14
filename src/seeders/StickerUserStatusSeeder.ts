import { DataSource } from "typeorm";
import { StickerUserStatus } from "../entities/StickerUserStatus";

export class StickerUserStatusSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerUserStatus);

    const stickerUserStatuses = [
      { status: "Approved" },
      { status: "Rejected" },
      { status: "Removed" },
      { status: "Disabled" },
    ];

    for (const userStatus of stickerUserStatuses) {
      const exists = await repository.findOneBy({ status: userStatus.status });
      if (!exists) {
        const stickerUserStatus = repository.create(userStatus);
        await repository.save(stickerUserStatus);
      }
    }
  }
}
