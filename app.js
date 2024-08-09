const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const cron = require('node-cron');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Configurar eventos de socket.io
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
       console.log('Cliente desconectado');
    });

    client.on('livescores', (data) => {
      // Actualizar los datos en el cliente
      console.log(data);
    });
});

// Configurar tarea cron para emitir "hola mundo" en el evento livescores cada 5 segundos
cron.schedule('*/5 * * * * *', () => {
    io.emit('livescores', 'hola mundo');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});