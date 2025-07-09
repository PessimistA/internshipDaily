const net = require('net');
const readline =require('readline');
const ALLOWED_IP = "-"; 

const server = net.createServer((socket)=>{
    const clientIP = socket.remoteAddress;

    console.log('Client connected:', clientIP);
    const cleanIP = clientIP.startsWith('::ffff:') ? clientIP.slice(7) : clientIP;//ip nin başlangıcında olan kısım için
    const user = readline.createInterface({
        input:process.stdin,//input
        output:process.stdout,//output
        prompt:'Me:'//başlangıçta ben yazacak
    })
    if (cleanIP != ALLOWED_IP) {//farklı bir ip bağlanmaya çalışırsa engelle
        console.log(`Connection from ${cleanIP} rejected.`);
        socket.end(); // Bağlantıyı kapat
        return;//sonlandır
    }
    user.prompt();//çağrıldığında bu giriş isteği kullanıcıya görünür
    user.on('line',(line)=>{
        socket.write(line+'\n');//yazdığım çıktı burada gözükür
        user.prompt();
    })

    socket.on('data', (data) => {//karşı taraftan gelen bilgi
        const message = data.toString().trim();
        readline.clearLine(process.stdout, 0);          // Mevcut satırı temizle
        readline.cursorTo(process.stdout, 0);           // Satırın başına git
        console.log('her:',message);                           // Mesajı yaz
        user.prompt();   
    });

    socket.on('end', () => {//client bağlantıyı kapatırsa
        console.log('Client disconnected');
        user.close();
    });
});
server.listen(-, '0.0.0.0', () => {
  console.log('Server is listening on port -...');
});