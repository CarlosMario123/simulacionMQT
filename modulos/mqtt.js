const mqtt = require('mqtt');

class MqttHandler {
  constructor(webSocketHandler) {
    this.webSocketHandler = webSocketHandler;
    this.client = mqtt.connect('mqtt://broker.emqx.io');
    this.client.on('connect', this.onConnect.bind(this));
    this.client.on('message', this.handleMqttMessage.bind(this));
  }

  onConnect() {
    console.log('Conectado al broker MQTT');
    this.subscribeToTopic();
  }

  subscribeToTopic() {
    this.client.subscribe('salidaBarra', (err) => {
      if (!err) {
        console.log('Suscrito al topic "salidaBarra"');
      } else {
        console.error('Error al suscribirse al topic', err);
      }
    });
  }

  handleMqttMessage(topic, message) {
    let data;
    try {
      data = JSON.parse(message.toString()); // Intenta parsear el mensaje como JSON
    } catch (error) {
      console.error('Error al parsear el mensaje MQTT como JSON:', error);
      return; // Si hay un error en el parsing, se detiene el procesamiento
    }
  
    // Validación adicional de los datos recibidos, por ejemplo:
    if (typeof data !== 'object' || data === null) {
      console.error('El mensaje MQTT no es un objeto JSON válido');
      return; // Si los datos no son un objeto JSON válido, se detiene el procesamiento
    }
    
    // Si los datos pasan la validación, se envían a través del WebSocket
    console.log("Información llegada al Mqtt");
    console.log(data);
    this.webSocketHandler.broadcastToClients(data);
  }
  
}

module.exports = MqttHandler;
