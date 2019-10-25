import dotenv from "dotenv";
import URLS from "./urls";

type DatabaseType = "postgres" | "mysql";
const ENV = process.env.ENV ? process.env.ENV : "dev";
const config = dotenv.config();
if (!config) throw new Error("No env");

export default {
  ENV,
  URLS,
  DB: {
    HOST: process.env.DB_HOST as string,
    PORT: Number(process.env.DB_PORT),
    TYPE: process.env.DB_TYPE as DatabaseType,
    DATABASE: process.env.DB_NAME as string,
    USERNAME: process.env.DB_USERNAME as string,
    PASSWORD: process.env.DB_PASSWORD as string,
    URL: process.env.DB_URL
  }
};
