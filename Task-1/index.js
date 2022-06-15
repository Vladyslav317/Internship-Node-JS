const os = require('os');
const http = require('http');

exports.getIpInfo = function(option) {
  return new Promise((resolve, reject) => {
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

      resolve('Private ip address: ' + address.join('') || '0.0.0.0');
    }

    if (option === 'public') {
      http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(response) {
        response.on('data', ip => resolve(`Public ip address: ${ip}` || '0.0.0.0'));
      });
    }
  })
}
