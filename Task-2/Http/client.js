const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/home',
  method: 'POST'
};

function getData(res) {
  console.log('STATUS: ' + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', message => {
    console.log('Response: ' + message);
  });
  res.on('end', () => {
    console.log('Response ENDED');
  });
}

const client = http.request(options, res => {
  if (options.method === 'GET') {
    getData(res)
  }

  if (options.method === 'POST') {
    getData(res);
  }

  if (options.method === 'PUT') {
    getData(res)
  }

  if (options.method === 'PATCH') {
    getData(res);
  }
});

client.on('error', error => {
  console.log('problem with request: ' + error.message);
});


client.end();
