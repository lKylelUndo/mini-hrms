import "dotenv/config";

export const ENV = {
  APP_NAME: process.env.APP_NAME || "Mini HRMS System",
  PORT: process.env.PORT || "8000",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  BACKEND_URL: process.env.BACKEND_URL_URL || "http://localhost:8000",
  DATABASE_HOST: process.env.DATABASE_HOST || "localhost",
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || "root",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
  DATABASE_PORT: process.env.DATABASE_PORT || 3306,
  DATABASE_NAME: process.env.DATABASE_NAME || "mini_hrms_db",
};
