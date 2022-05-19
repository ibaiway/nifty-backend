import cron from 'node-cron';
import app from './server.js';
import config from './config/config.js';
import connect from './db/connect.js';
import callStats from './controllers/stats-controller.js';

connect().then(async function onServerInit() {
  config.logger.info(`Mongo DB connected`);

  app.listen(config.app.PORT, () => {
    config.logger.info(`Server running at http://localhost:${config.app.PORT}`);
  });

  cron.schedule(
    '*/15 * * * *',
    () => {
      callStats();
    },
    {
      scheduled: true,
      timezone: 'Europe/Madrid'
    }
  );
});
