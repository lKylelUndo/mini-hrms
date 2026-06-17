import app from "./app";
import { ENV } from "./config/env";

const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => {
      (console.log(`${ENV.APP_NAME} started successfully!`),
        console.log(`URL: ${ENV.BACKEND_URL}`));
    });
  } catch (error) {
    console.error("Could not start engine:", error);
    process.exit(1);
  }
};

startServer();
