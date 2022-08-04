const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const PORT = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);

const io = new Server(server);
const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

const Chatmodel = require('./model');

const users = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('send chat message', (msg) => {
    io.emit('chat message', { name: users[socket.id], message: msg });
  });

  socket.on('new-user', async (user) => {
    try {
      users[socket.id] = user;

      if (user === null) {
        return;
      }

      if (user === 'Vincent') {
        return;
      }

      Chatmodel.insertMany({ user });

      io.emit('user-connected', user);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', () => {
    io.emit('userOffline', { name: users[socket.id] });
  });
});

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
}).catch((error) => console.error(error));

server.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
