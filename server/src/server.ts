import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { initSockets } from "./sockets";

const PORT = process.env.PORT;

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST" , "PUT" , "DELETE" , "PATCH"] },
});

initSockets(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 YogiiGo Server running on http://localhost:${PORT}`);
});
