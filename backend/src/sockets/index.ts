import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSockets = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST", "PATCH", "DELETE"] }
  });

  io.on("connection", (socket) => {
    console.log("Client connected to socket:", socket.id);

    // Users can join a room for a specific trip to get real-time updates
    socket.on("join_trip", (tripId: string) => {
      socket.join(`trip:${tripId}`);
      console.log(`Socket ${socket.id} joined trip:${tripId}`);
    });

    socket.on("leave_trip", (tripId: string) => {
      socket.leave(`trip:${tripId}`);
      console.log(`Socket ${socket.id} left trip:${tripId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
