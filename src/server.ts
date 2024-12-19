import mongoose from 'mongoose';
import app from './app';
import { createServer } from 'http';
import config from './app/config';
import { autoUser } from './app/utils/autoUsers';
import { Server } from 'socket.io';


const httpServer = createServer(app)


const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Allow frontend connection
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let server: typeof httpServer;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('🛢 Database connected successfully');
    await autoUser();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });


    // setup socket io
    io.on('connection',(socket)=>{
      console.log(`user connected: ${socket.id}`)

      // join room
      socket.on('join-rom', (roomId)=>{
        socket.join
      })
    })


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
