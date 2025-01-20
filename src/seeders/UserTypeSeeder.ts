import { DataSource } from "typeorm";
import { UserType } from "../entities/UserType"; // Ensure the correct path to UserType entity

export class UserTypeSeeder {
  static async seed(dataSource: DataSource) {
    const repository = dataSource.getRepository(UserType);

    const userTypes = [
      { type: "Trial User" },
      { type: "Paid User" },
      { type: "Premium User" },
      { type: "Business User" },
    ];

    for (const userType of userTypes) {
      const exists = await repository.findOneBy({ type: userType.type });
      if (!exists) {
        const userTypeEntity = repository.create(userType);
        await repository.save(userTypeEntity);
      }
    }

    console.log("UserTypeSeeder: Seeded data successfully.");
  }
}
