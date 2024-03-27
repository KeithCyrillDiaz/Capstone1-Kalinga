import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { WebSocket } from 'expo';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://your-server-ip:8081');

    socket.onopen = () => {
      console.log('Connected to server');
    };

    socket.onmessage = (event) => {
      setReceivedMessage(event.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    socket.send(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.receivedMessage}>{receivedMessage}</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivedMessage: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default ChatScreen;