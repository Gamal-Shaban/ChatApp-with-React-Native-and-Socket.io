import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
} from 'react-native';
import io from 'socket.io-client';
const socket = io('http://192.168.100.5:3000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket;
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const submitMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  const chatMessages = messages.map((chatMessage) => (
    <Text key={chatMessage} style={{color: 'red'}}>
      {chatMessage}
    </Text>
  ));
  return (
    <View style={{flex: 1, paddingTop: 50,  }}>
      <TextInput
        style={styles.input}
        value={message}
        autoCorrect={false}
        onSubmitEditing={() => submitMessage()}
        onChangeText={(msg) => setMessage(msg)}
      />
      {chatMessages}
    </View>
  );
}
export default App;

const styles = StyleSheet.create({
  scrollView: {
    alignSelf: 'stretch',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {},
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 40,
  },
});
