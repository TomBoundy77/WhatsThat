import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
    // Add your sign-out logic here
    // For example, clearing authentication tokens or navigating to the sign-in screen
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.whatsThatTitle}>WhatsThat</Text>
      <Text style={styles.title}>Welcome to my WhatsThat App</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
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
    fontSize: 42, // Increase the font size
    fontWeight: 'bold',
    color: 'darkgreen', // Change the text color to dark green
    position: 'absolute',
    top: 20,
    right: 20,
  },
  signOutButton: {
    backgroundColor: 'red',
    paddingVertical: 8, // Adjust the padding to make the button smaller
    paddingHorizontal: 16, // Adjust the padding to make the button smaller
    borderRadius: 5,
    position: 'absolute', // Position the button at the bottom
    bottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // Decrease the font size to fit the smaller button
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;






