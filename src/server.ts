import mongoose from 'mongoose';
import app from './app';
import { createServer } from 'http';
import config from './app/config';
import { Server } from 'socket.io';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';

const httpServer = createServer(app);

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
    await seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    // setup socket io
    io.on('connection', socket => {
      console.log(`user connected: ${socket.id}`);

      // join room
      socket.on('join-room', roomId => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
        socket.to(roomId).emit('user-connected', socket.id);
      });

      // handle signing data (offer/answer/candidate)
      socket.on('offer', data => {
        const { offer, roomId } = data;
        socket.to(roomId).emit('offer', { offer, senderId: socket.id });
      });

      socket.on('answer', data => {
        const { answer, roomId } = data;
        socket.to(roomId).emit('answer', { answer, senderId: socket.id });
      });

      socket.on('candidate', data => {
        const { candidate, roomId } = data;
        socket.to(roomId).emit('candidate', { candidate, senderId: socket.id });
      });

      // handle disconnection
      socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
        io.emit('User disconnected', socket.id);
      });
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

// frontend implement

// const socket = io('http://localhost:3000'); // Connect to the server

// const roomId = 'my-room';

// // Join the room
// socket.emit('join-room', roomId);

// // Listen for signaling events
// socket.on('offer', async ({ offer, senderId }) => {
//   console.log('Received offer:', offer);

//   // Set the remote description and create an answer
//   await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//   const answer = await peerConnection.createAnswer();
//   await peerConnection.setLocalDescription(answer);

//   // Send the answer back to the signaling server
//   socket.emit('answer', { answer, roomId });
// });

// socket.on('answer', async ({ answer }) => {
//   console.log('Received answer:', answer);
//   await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
// });

// socket.on('ice-candidate', async ({ candidate }) => {
//   console.log('Received ICE candidate:', candidate);
//   await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
// });

// // Send an offer when starting a call
// async function startCall() {
//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);

//   // Send the offer to the signaling server
//   socket.emit('offer', { offer, roomId });
// }

// // Send ICE candidates
// peerConnection.onicecandidate = (event) => {
//   if (event.candidate) {
//     socket.emit('ice-candidate', { candidate: event.candidate, roomId });
//   }
// };
