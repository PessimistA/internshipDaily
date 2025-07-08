const net = require('net');

const client = new net.Socket();//net kütüphanesinin içinde
client.connect(-, '-', () => {//bu ip adresine bağlan diyor
  console.log('Connected to server');

  setInterval(() => {//belirli aralıklarla işlemi tekrarlamak istersen bunu yaparsın
    client.write('ping\n');
    console.log('Sent: ping');
  }, 2000); // her 2 saniyede bir ping
});

client.on('data', (data) => {
  console.log('Received:', data.toString().trim());
});

client.on('close', () => {
  console.log('Connection closed');
});
