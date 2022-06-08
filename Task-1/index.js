const os = require('os');
const http = require('http');

 function getIpInfo(option) {
  const interfaces = os.networkInterfaces();
  const address = [];

  if (option === 'private') {
    for (const key in interfaces) {
      interfaces[key].forEach(value => {
        if (value.family === 'IPv4' && value.internal === false) {
          address.push(value.address);
        }
      });
    }

    console.log('Private ip address: ' + address.join('') || '0.0.0.0');
  }

  if (option === 'public') {
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(response) {
      response.on('data', ip => console.log(`Public ip address: ${ip}` || '0.0.0.0'));
    });
  }
}

getIpInfo('public');
