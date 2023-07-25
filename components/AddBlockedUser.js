import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBlockedUser = ({ navigation }) => {
  const [userId, setUserId] = useState('');

  const handleAddBlockedUser = async () => {
    try {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('whatsthat_session_token');
      if (!token) {
        console.log('Token not found. Please log in.');
        navigation.navigate('SignIn');
        return;
      }

      const response = await fetch('http://localhost:3333/api/1.0.0/user/blocked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
      });

      if (response.status === 200) {
        // Blocked user successfully
        console.log('User blocked successfully.');
        navigation.goBack();
      } else if (response.status === 400) {
        console.log('You can\'t block yourself.');
      } else if (response.status === 401) {
        console.log('Unauthorized');
        await AsyncStorage.removeItem('whatsthat_session_token');
        await AsyncStorage.removeItem('whatsthat_user_id');
        navigation.navigate('SignIn');
      } else if (response.status === 404) {
        console.log('User not found.');
      } else {
        console.log('Server Error');
      }
    } catch (error) {
      console.log('Error adding blocked user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Blocked User</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={(text) => setUserId(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddBlockedUser}>
        <Text style={styles.buttonText}>Add Blocked User</Text>
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

export default AddBlockedUser;
