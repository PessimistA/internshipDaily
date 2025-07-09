const net = require('net');

const client = new net.Socket();

client.connect(-,'-',()=>{
    console.log('client connected to the server');
    setInterval(()=>{
        client.write('ping');
    },2000);
    client.on('data',(data)=>{
        console.log(data.toString().trim());
    });
    client.on('close',()=>{
        console.log('connection closed');
    });
});