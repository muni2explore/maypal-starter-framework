import { DataSource } from "typeorm";
import { StickerItemType } from "../entities/StickerItemType"; 

export class StickerItemTypeSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(StickerItemType);

    const stickerItemTypes = [
      { type: "Car", icon: "car_icon.png" },
      { type: "House", icon: "house_icon.png" },
      { type: "MotorBike", icon: "motorbike_icon.png" },
      { type: "MobilePhone", icon: "mobilephone_icon.png" },
      { type: "Laptop", icon: "laptop_icon.png" },
      { type: "Room", icon: "room_icon.png" },
      { type: "Accessories", icon: "accessories_icon.png" },
      { type: "Others", icon: "others_icon.png" },
    ];

    for (const itemType of stickerItemTypes) {
      const exists = await repository.findOneBy({ type: itemType.type });
      if (!exists) {
        const stickerItemType = repository.create(itemType);
        await repository.save(stickerItemType);
      }
    }

    console.log("StickerItemTypeSeeder: Seeded data successfully.");
  }
}
