const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const httpServer = http.createServer();

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", ({ room, receiver }) => {
        socket.join(room); // sender join
        console.log(`user with id-${socket.id} joined room - ${room} and ${receiver}`);
        if (receiver) {
            socket.broadcast.emit('invite', { room, receiver })
        }
    });

    socket.on("message", ({ room, sender, receiver }) => {
        io.to(room).emit("reloadChat", { pengirim: sender, penerima: receiver });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

httpServer.listen(3001, () => {
    console.log(`Socket.io server is running`);
});