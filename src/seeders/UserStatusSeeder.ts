import { DataSource } from "typeorm";
import { UserStatus } from "../entities/UserStatus"; 

export class UserStatusSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserStatus);

    const userStatuses = [
      { status: "Active" },
      { status: "deactivate" },
    ];

    for (const userStatus of userStatuses) {
      const exists = await repository.findOneBy({ status: userStatus.status });
      if (!exists) {
        const userStatusEntity = repository.create(userStatus);
        await repository.save(userStatusEntity);
      }
    }

    console.log("UserStatusSeeder: Seeded data successfully.");
  }
}
