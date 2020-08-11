const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botname = "PissCord Bot";


io.on("connection", (socket) => {
        socket.on("joinRoom", name => {
                socket.emit("message", formatMessage(botname, "Welcome To PissCord!"));
                // console.log(formatMessage(botname, "Welcome To PissCord!"));

                socket.broadcast.emit(
                "message",
                formatMessage(botname, `${name} has joined the chat`)
                );
        });

        console.log("New WS Connection...");

        socket.on("chatMessage", (msg) => {
            io.emit("messageText", formatMessage(botname, msg));
        });

        socket.on("typing", name => {
            socket.broadcast.emit("typing", `${name} is typing...`)
        });
});

server.listen(process.env.PORT || 5100);
