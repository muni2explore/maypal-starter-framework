import { DataSource } from "typeorm";
import { StickerUserType } from "../entities/StickerUserType";

export class StickerUserTypeSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerUserType);

    const stickerUserTypes = [
      { type: "PrimaryUser" },
      { type: "PairedUser" },
      { type: "MemberUser" },
    ];

    for (const userType of stickerUserTypes) {
      const exists = await repository.findOneBy({ type: userType.type });
      if (!exists) {
        const stickerUserType = repository.create(userType);
        await repository.save(stickerUserType);
      }
    }
  }
}
