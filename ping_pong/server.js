const net = require('net');

const ALLOWED_IP = "-"; 
const server = net.createServer((socket) => {
  const clientIP = socket.remoteAddress;

  console.log('Client connected:', clientIP);
  const cleanIP = clientIP.startsWith('::ffff:') ? clientIP.slice(7) : clientIP;//ip nin başlangıcında olan kısım için
  if (cleanIP != ALLOWED_IP) {//farklı bir ip bağlanmaya çalışırsa engelle
    console.log(`Connection from ${cleanIP} rejected.`);
    socket.end(); // Bağlantıyı kapat
    return;//sonlandır
  }
 socket.on('data', (data) => {//socket açılır client data diye gönderir
    const msg = data.toString().trim();//data ping
    console.log('Received:', msg);

    if (msg === 'ping') {
      socket.write('pong\n');//socket geri pong yazar
    }
  });

  socket.on('end', () => {//end yazısını gönderirse yani biterse client bağlantısını kesmiş demektir
    console.log('Client disconnected');
  });
});

server.listen(-, '0.0.0.0', () => {//localdeki bağlantıları dinler  portunu dinler
  console.log('Server listening on port -...');
});
