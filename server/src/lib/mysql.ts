import serverlessMysql from "serverless-mysql";
import { ENV } from "../config/env";

export const mysql = serverlessMysql({
  config: {
    host: ENV.DATABASE_HOST,
    database: ENV.DATABASE_NAME,
    user: ENV.DATABASE_USERNAME,
    password: ENV.DATABASE_PASSWORD,
    port: ENV.DATABASE_PORT as number
  },
});
