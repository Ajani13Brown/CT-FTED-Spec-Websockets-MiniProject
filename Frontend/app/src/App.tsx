import { FormEvent, useEffect, useState } from "react";
import { socket } from "./socket";
import { Button, Container, Form } from "react-bootstrap";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Server');
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from Server');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handleUsernameSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsUsernameSet(true);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <Container>
      <h1>Learning Websockets</h1>
      {!isUsernameSet ? (
        <Form onSubmit={handleUsernameSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={handleUsernameChange}
              value={username}
              autoComplete="off"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Set Username
          </Button>
        </Form>
      ) : (
        <>
          {!isConnected ? (
            <Button onClick={() => socket.connect()}>Connect to Chatroom</Button>
          ) : (
            <>
              <ChatBody username={username} />
              <MessageInput username={username} />
              <Button variant="danger" onClick={() => socket.disconnect()}>Leave Chatroom</Button>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
