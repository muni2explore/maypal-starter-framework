import { DataSource } from "typeorm";
import { User } from "../entities/User";
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
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});