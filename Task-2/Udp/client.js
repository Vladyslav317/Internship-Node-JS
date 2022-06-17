const dgram = require('dgram');


const PORT = 41234;
const HOST = '127.0.0.1';

const client = dgram.createSocket('udp4');

const message = Buffer.from('My KungFu is Good!');

client.send(message, 0, message.length, PORT, HOST, (err) => {
  if (err) throw err;

  console.log(`UDP message sent to ${HOST} : ${PORT}`);

  client.close();
});

