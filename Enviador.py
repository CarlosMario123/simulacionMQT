import paho.mqtt.client as mqtt
import json
import time
import random

broker_address = "broker.emqx.io"
port = 1883
topic = "salidaBarra"

client = mqtt.Client("ClientePython")
client.connect(broker_address, port)

while True:
    # Generaremos un número aleatorio entre 10 y 100
    mensaje = {"msg": random.randint(10, 100)}

    # convertir dicionario a un json
    message_json = json.dumps(mensaje)

    # publicaremos el mensaje en el topic
    client.publish(topic, message_json)

    #esperamos nos segundo
    time.sleep(2)

client.disconnect()
