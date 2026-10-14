import { app } from "./app";
import { env } from "./infrastructure/config/env";
import { logger } from "./infrastructure/config/logger";

app.listen(env.port, () => {
  logger.info(`Backend listening on port ${env.port}`);
});
