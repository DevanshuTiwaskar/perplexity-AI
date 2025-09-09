require("dotenv").config();
const app = require("./src/app");
const connnectdb = require("./src/db/db");
const http = require("http");
const initSocket = require("./src/sockets/socket.server");

connnectdb();

const httpServer = http.createServer(app);

initSocket(httpServer);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
