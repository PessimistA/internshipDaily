const net = require('net');
const readline =require('readline');

const server = net.createServer((socket)=>{
    console.log('client connected: ',socket.remoteAddress);//bağlanan cihazın adresi

    const user = readline.createInterface({
        input:process.stdin,//input
        input:process.stdout,//output
        prompt:'Me:'//başlangıçta ben yazacak
    })
    user.prompt();//çağrıldığında bu giriş isteği kullanıcıya görünür
    user.on('line',(line)=>{
        socket.write(line+'\n');//yazdığım çıktı burada gözükür
        user.prompt();
    })

    socket.on('data', (data) => {//karşı taraftan gelen bilgi
        console.log('Her:', data.toString().trim());
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