const ip = require('ip');

exports.getIpInfo = function() {
  const myIpAddress = '192.168.0.104';
  const unusubleAddress = '0.0.0.0';

  if (myIpAddress !== ip.address()) {
    return unusubleAddress;
  }

  return myIpAddress;
}