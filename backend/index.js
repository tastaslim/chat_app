import { Server } from "socket.io";
import { log } from "console";
const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});
const users = {};
io.on('connection', socket => {
    socket.on('new-user', name => {
        log(`New user ${name} has joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('join-chat', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
