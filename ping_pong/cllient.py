import socket

soc = socket.socket()
soc.connect(('-', -))  

while True:
    soc.send("ping".encode())
    data = soc.recv(1024).decode()
    print("Received:", data)