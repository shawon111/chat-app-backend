// node server script
const io = require('socket.io')(7000);


const users = {};
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    socket.on('send-message', message => {
        socket.broadcast.emit('message-recieved', {message: message, name: users[socket.id]})
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id]
    });
})