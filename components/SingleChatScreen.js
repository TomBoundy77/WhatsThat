import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

const SingleChatScreen = ({ route }) => {
  const { chatName, draft } = route.params;

  const [message, setMessage] = useState(draft?.text || '');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (draft) {
      // If a draft is provided in the route params, set it to the message state
      setMessage(draft.text);
    }
  }, [draft]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { id: messages.length.toString(), text: message }]);
      setMessage('');
    }
  };

  const handleSaveDraft = async () => {
    try {
      if (message.trim() !== '') {
        const timestamp = new Date().getTime().toString();
        await AsyncStorage.setItem(timestamp, message.trim());
        setMessage('');
      }
    } catch (error) {
      console.log('Error saving draft:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chatName}>{chatName}</Text>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageItem}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.chatBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveDraft}>
          <Text style={styles.saveButtonText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  chatName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SingleChatScreen;

