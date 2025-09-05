import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { initSockets } from "./sockets";

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

initSockets(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 YogiiGo Server running on http://localhost:${PORT}`);
});
