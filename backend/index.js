// import packages
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const port = process.env.PORT || 5000;
//////////////////////////////////////////////////

app.use(cors());

//for node js its creating server for node js
const server = http.createServer(app);

//for socket its creating server for socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//when someone connected  with this http://localhost:3000 port you will we getting  this type msm (user connectder 48uuey47773)
io.on("connection", (socket) => {
  console.log(`user connectder ${socket.id}`); //1 it will be print when someone join the chat

  socket.on("send-message", (message) => {
    // console.log(message);
    // broadcast the  recevied message to all the connected users
    //emit data for io if meanse send data to frontend
    io.emit("received-message", message);
  });

  socket.on("disconnect", () => console.log("user disconnected ")); //2 it will be print when someone to leave the chat
});
server.listen(port, () => console.log("server is listning on port 5000"));
