const net = require('net');
const readline = require('readline');

const client = new net.Socket();

client.connect(-, '-', () => { 
  console.log('Connected to server');

  const user = readline.createInterface({//server kısmına benzer user için oluştur
    input: process.stdin,
    output: process.stdout,
    prompt: 'Me: '
  });

  user.prompt();

  user.on('line', (line) => {//yazma kısmı
    client.write(line + '\n');
    user.prompt();
  });

  setInterval(() => {//süre geciktirme durumlarında interval kullanılır
    client.write('ping\n');
    console.log('Sent: ping');
  }, 2000);

  client.on('data', (data) => {//karşı taraftan gelen bilgi
    console.log('Her:', data.toString().trim());
    user.prompt();
  });

  client.on('close', () => {
    console.log('Connection closed');
    user.close();
  });
});
