import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError(''); // Clear the error message if both fields are filled

   {/*  try {
        const response = await fetch('http://localhost:3333/api/1.0.0/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
// couldn't get server to respond so commented out so you have access to the app
        if (response.status === 200) {
          const data = await response.json();
          // Save the token and ID to AsyncStorage
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('userId', data.id.toString());*/}

          // Navigate to the Home screen
          navigation.navigate('Home');
      {/*  } else if (response.status === 400) {
          setError('Invalid email/password supplied');
        } else {
          setError('Something went wrong');
        }
      } catch (error) {
        setError('Something went wrong');
      }*/}
    }
  };

  const handleNavigateToAddNewUser = () => {
    navigation.navigate('AddNewUser'); // Navigate to the AddNewUser screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.whatsThatTitle}>WhatsThat</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToAddNewUser}>
        <Text style={styles.buttonText}>Add New User</Text>
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
  whatsThatTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'darkgreen',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SignInScreen;




