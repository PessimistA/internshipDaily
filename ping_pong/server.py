import socket

soc = socket.socket()
soc.bind(('0.0.0.0', -))#sadece yerel bağlantıdan gelenler
ALLOWED_IP = "-" #tek bir wifi ağını kabul et 
soc.listen(1)#socket dinliyor
print("Server is waiting...")

conn, addr = soc.accept()
print("Connected by", addr)
client_ip = addr[0]
if client_ip != ALLOWED_IP:
    print(f"Connection from {client_ip} rejected.")#farklı bir ip denerse reddet
    conn.close()
else:
    print(f"Connected by {client_ip}")#eğer izin verilen ip ise kabul et

    while True:
        data = conn.recv(1024).decode()
        if not data:
            break
        print("Received:", data)
        if data == "ping":
            conn.send("pong".encode())
