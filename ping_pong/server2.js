
const net = require('net');

const allowed = '-';

const server = net.createServer((socket)=>{
    const clientip = socket.remoteAddress;
    const cleanip = clientip.startsWith('::ffff:') ? clientip.slice(7) : clientip;
    if (cleanip!=allowed) {
        socket.end();
        return;
    }
    socket.on('data',(data)=>{
        const msg = data.toString().trim();
        console.log(msg);
        if(msg =='ping'){
            socket.write('pong')
        }

    });
    socket.on('end',()=>{
        console.log('bağlantı kesildi');
    });
});

server.listen(-,'0.0.0.0',()=>{
    console.log('dinleniyor');
});