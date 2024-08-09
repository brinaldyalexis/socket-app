const { io } = require('../app');




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
 