import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddContactScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState('');

  const handleAddContact = async () => {
    try {
      // Request URL and token
      const url = 'http://localhost:3333/api/1.0.0/user/contact';
      const token = 'b5d9e7be6c97aa855f721b6e742120f2'; // Hard-coded authentication token

      // Request body
      const data = {
        user_id: parseInt(userId), // Convert to an integer
      };

      // Perform the POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body: JSON.stringify(data),
      });

      // Handle different response codes
      if (response.status === 200) {
        // Successfully added contact
        navigation.goBack();
      } else if (response.status === 400) {
        // You can't add yourself as a contact
        throw new Error("You can't add yourself as a contact");
      } else if (response.status === 401) {
        // Unauthorized
        throw new Error('Unauthorized');
      } else if (response.status === 404) {
        // Not Found
        throw new Error('Not Found');
      } else if (response.status === 500) {
        // Server Error
        throw new Error('Server Error');
      } else {
        // Something went wrong
        throw new Error('Something went wrong');
      }
    } catch (error) {
      // Handle any errors that occurred during the POST request
      console.log('Error adding contact:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Contact</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddContactScreen;


