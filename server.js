const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = process.env.PORT || 6120;

app.get ('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message sent', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message sent', msg);
    });
});


server.listen(PORT, () => {
    console.log('listening on PORT:' + PORT);
});