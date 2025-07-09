const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const readline = require('readline');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Yeni kullanıcı bağlandı');
  const user = readline.createInterface({
        input:process.stdin,//input
        output:process.stdout,//output
        prompt:'Me:'//başlangıçta ben yazacak
    })
  user.prompt();//çağrıldığında bu giriş isteği kullanıcıya görünür
    user.on('line',(line)=>{
        socket.emit('chat message', line);//yazdığım çıktı burada gözükür
        user.prompt();
  })
  socket.on('chat message', (msg) => {
    console.log('Mesaj geldi:', msg);
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

server.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});
