import app from './server.js';
import config from './config/config.js';
import connect from "./db/connect.js";

connect().then(async function onServerInit() {
  config.logger.info(`Mongo DB connected`);

  app.listen(config.app.PORT, () => {
    config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
  });
});
