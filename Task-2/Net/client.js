// 1. NET
const net = require('net');

const port = 5000;

const client = net.connect({ port }, () => {
  console.log('connected to server!');
});

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from the server');
});
