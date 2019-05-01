"use strict"

var express = require("express"),
    app = express(),
    http = require("http").createServer(app),
    io = require("socket.io")(http),
    port = process.env.PORT || 3000,
    publicDir = express.static(__dirname + "/public");

app.use(publicDir);

http.listen(port, () => {
    console.log("App con express iniciada en el puerto %d", port);
});

app.get("/", (req, res) => {
    res.sendFile(publicDir + "index.html");
});

// Programacion para socket.io

io.on("connection", (socket) => {
    socket.on("newMessage", (message) => {
        io.emit("userSays", message);
    })
    socket.broadcast.emit("newUser", {
        newUser: "Nuevo usuario conectado"
    })
});