const ws = new WebSocket('ws://localhost:3000'); // Conectarse al servidor WebSocket

    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };
    
    ws.onmessage = (event) => {
      console.log('Mensaje recibido:', event.data); // Mostrar el mensaje recibido en la consola del navegador
      try {
        let data = JSON.parse(event.data);
        console.log(data);
    
        // Agregar el mensaje a una lista en la página HTML
        const messageList = document.getElementById('messageList');
         messageList.innerHTML = data.msg + " cm"; // Acceder a la propiedad 'msg' del objeto JSON
         //messageList.style = `--value:${data.msg};`;
      
      } catch (error) {
        console.error('Error al analizar el mensaje como JSON:', error);
      }
    };