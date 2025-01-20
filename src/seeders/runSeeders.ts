import { AppDataSource } from "../config/database";
import { StickerTypeSeeder } from "../seeders/StickerTypeSeeder";
import { StickerStatusSeeder } from '../seeders/StickerStatusSeeder';
import { StickerItemTypeSeeder } from '../seeders/StickerItemTypeSeeder';
import { StickerCallTypeSeeder } from '../seeders/StickerCallTypeSeeder';
import { UserTypeSeeder } from '../seeders/UserTypeSeeder';

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

    // Execute the seeders
    await StickerTypeSeeder.seed(AppDataSource);
    await StickerStatusSeeder.seed(AppDataSource);
    await StickerItemTypeSeeder.seed(AppDataSource);
    await StickerCallTypeSeeder.seed(AppDataSource);
    await UserTypeSeeder.seed(AppDataSource);

    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

runSeeders();
