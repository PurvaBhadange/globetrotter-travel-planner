import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

let socket: Socket | null = null;

export const getTripSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("[SOCKET] Connected to GlobeTrotter Real-Time Server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("[SOCKET] Disconnected from GlobeTrotter Real-Time Server");
    });
  }

  return socket;
};

export const joinTripRoom = (tripId: string) => {
  const s = getTripSocket();
  s.emit("join_trip", tripId);
};

export const leaveTripRoom = (tripId: string) => {
  const s = getTripSocket();
  s.emit("leave_trip", tripId);
};
