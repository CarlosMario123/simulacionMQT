import serial
import time
import json
import paho.mqtt.client as mqtt


ser = serial.Serial('COM7', baudrate=9600, timeout=1)

#------broker------------------------
broker_address = "broker.emqx.io"
port = 1883
topic = "salidaBarra"
client = mqtt.Client("ClientePython")
client.connect(broker_address, port)
#---------------------------------------------------------------------------
while True:

    data = ser.readline()
    data = data.decode("utf-8").strip()
    
    mensaje = {"msg":data}#creamos un dicionario
    message_json = json.dumps(mensaje) #diciconaario a json
    print("Distancia del sensor: " + data)

   
    
    time.sleep(0.1) 
    client.publish(topic, message_json)#publicar topic
