import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Container, ListGroup, ListGroupItem, Button } from "react-bootstrap";

interface Message {
  data: string;
  username: string;
  timestamp: string;
}

interface ChatBodyProps {
  username: string;
}

const ChatBody = ({ username }: ChatBodyProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);

  useEffect(() => {
    const handleMessage = (emittedMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, emittedMessage]);
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, []);

  const toggleFilter = () => {
    setFilterApplied(prev => !prev);
  };

  const filteredMessages = filterApplied
    ? messages.filter(message => message.username === username)
    : messages;

  return (
    <Container>
      <Button onClick={toggleFilter} className="mb-3">
        {filterApplied ? "Show All Messages" : "Show My Messages"}
      </Button>
      <ListGroup>
        {filteredMessages.map((message, idx) => (
          <ListGroupItem key={idx}>
            <strong>{message.username}</strong> [{new Date(message.timestamp).toLocaleString()}]: {message.data}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ChatBody;
