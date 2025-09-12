const cookie = require("cookie");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const aiServer = require("../services/ai.service");
const messageModel = require("../models/message.model");

async function initSocket(httpServer) {
  const io = new Server(httpServer);

  // 2. Middleware (runs before connection is accepted)
  io.use((socket, next) => {
    const cookies = socket.handshake.headers.cookie; // Extract cookies from handshake headers

    const { token } = cookies ? cookie.parse(cookies) : {};

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info to socket for later use
      socket.user = decoded; // we make new preperty socket.user and set decoded user

      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  // io.on("connection", (socket) => {
  //   console.log("socket is connected successfully");
  //   console.log(socket.user);

  //      //  Listen for custom event 'ai-message' from client
  //    socket.on('ai-message',async(message)=>{
  //     console.log("ai: ",message)

  //     // Call AI service with the message
  //     // const response = await aiServer.generateresulte(message)

  //     // Send AI response back to client
  //     // socket.emit('ai-response',response)

  //   aiServer.generateStream,(textchuck)=>{

  //     socket.emit('ai-response',textchuck)
  //   }

  //    })

  //   socket.on("disconnect", () => {
  //     console.log("a user is disconnect");
  //   });
  // });

  io.on("connection", (socket) => {
    console.log("socket user connect successfully");

    socket.on("ai-message", async (message) => {


      await messageModel.create({
        chat: message.chat,
        user: socket.user.id,
        text: message.text,
        role: "user",
      });

      const history = (await messageModel.find({ chat: message.chat })).map(
        (msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })
      );

      const result = await aiServer.generateStream(history, (textChuck) => {
        socket.emit("ai-response", textChuck);
      });

      await messageModel.create({
        chat: message.chat,
        user: socket.user.id,
        text: result,
        role: "model",
      });
    });

    socket.on("disconnect", (socket) => {
      console.log("socket user is disconnect");
    });
  });
}

module.exports = initSocket;
