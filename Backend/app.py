from flask import Flask
from flask_socketio import SocketIO
from datetime import datetime

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins ='*')

@socketio.on('message')
def handle_message(data):
    print("recived message: ", data)
    socketio.emit('message', data)
    

@socketio.on('connect')
def handle_connect():
    print('Client Connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')


if __name__ == '__main__':
    socketio.run(app)