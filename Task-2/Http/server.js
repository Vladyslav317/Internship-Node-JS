const http = require('http');

const obj = {response: 'Home'};

const server = http.createServer((req, res) => {
  if (req.url === '/home' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  } else if (req.url === '/home' && req.method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( {api: 'post'} ));
  } else if (req.url === '/home' && req.method === 'PUT') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( {method: 'put'} ));
  } else if (req.url === '/home' && req.method === 'PATCH') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( {api: 'patch'} ));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify( { message: 'Route not found' } ));
  }
});

server.listen(5000, () => console.log('Sever running'));
