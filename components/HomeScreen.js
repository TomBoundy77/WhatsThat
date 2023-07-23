import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const HomeScreen = ({ navigation }) => {
  const handleSignOut = () => {
  //would remove const handleSignOut = () => { if code bellow worked
  // Have commented out so the navigation still works
   {/* useEffect(() => {
           const checkToken = async () => {
             try {
               // Check if the token exists in AsyncStorage
               const token = await AsyncStorage.getItem('whatsthat_session_token');
               if (!token) {
                 // If token doesn't exist, navigate back to SignInScreen
                 navigation.navigate('SignIn');
               }
             } catch (error) {
               console.log('Error checking token:', error);
             }
           };

           // Add the focus listener
           const unsubscribe = navigation.addListener('focus', checkToken);

           // Clean up the listener on unmount
           return unsubscribe;
         }, [navigation]);


   const logout = async () => {
           try {
             const token = await AsyncStorage.getItem('whatsthat_session_token');
             if (!token) {
               console.log('Token not found. Already logged out.');
               navigation.navigate('SignIn');
               return;
             }

             const response = await fetch('http://localhost:3333/api/1.0.0/logout', {
               method: 'POST',
               headers: {
                 'X-Authorization': token,
               },
             });

             if (response.status === 200) {
               // Successfully logged out
               await AsyncStorage.removeItem('whatsthat_session_token');
               await AsyncStorage.removeItem('whatsthat_user_id');
               navigation.navigate('SignIn');
             } else if (response.status === 401) {
               console.log('Unauthorised');
               await AsyncStorage.removeItem('whatsthat_session_token');
               await AsyncStorage.removeItem('whatsthat_user_id');
               navigation.navigate('SignIn');
             } else {
               throw new Error('Something went wrong');
             }
           } catch (error) {
             console.log('Error during logout:', error);
           }
         }; */}
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






