const { Server } = require("socket.io");

function initSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connect", (socket) => {
    console.log("socket is connected successfully");
    socket.on("disconnnect", () => {
      console.log("a user is disconnect");
    });
  });
}

module.exports = initSocket;
