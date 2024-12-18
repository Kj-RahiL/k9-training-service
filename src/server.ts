import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';
import { autoUser } from './app/utils/autoUsers';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🛢 Database connected successfully');
    await autoUser();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
