const WebSocket = require('ws');

class WebSocketHandler {
  constructor() {
    // Crea un servidor WebSocket en el puerto 3000
    this.wss = new WebSocket.Server({ port: 3000 });
    
    // Configura el evento 'connection' para manejar nuevas conexiones entrantes
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  // Maneja una nueva conexión WebSocket
  handleConnection(ws) {
    console.log('Cliente WebSocket conectado');

    // Configura los eventos 'message' y 'close' para el cliente conectado
    ws.on('message', (message) => {
      console.log(`Mensaje recibido desde un cliente: ${message}`);
    });

    ws.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  }

  // Envía un mensaje a todos los clientes conectados
  broadcastToClients(data) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(data);
        client.send(JSON.stringify(data));

      }
    });
  }
}

module.exports = WebSocketHandler;
