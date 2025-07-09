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

  client.on('data', (data) => {//karşı taraftan gelen bilgi
    const message = data.toString().trim();
    readline.clearLine(process.stdout, 0);          // Mevcut satırı temizle
    readline.cursorTo(process.stdout, 0);           // Satırın başına git
    console.log('her:',message);                           // Mesajı yaz
    user.prompt();      
  });

  client.on('close', () => {
    console.log('Connection closed');
    user.close();
  });
});
