import React from 'react';
 import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const ChatsScreen = ({ navigation }) => {
   // Sample list of chats
   const chats = [
     { id: '1', name: 'John Doe' },
     { id: '2', name: 'Jane Smith' },
     { id: '3', name: 'Mark Johnson' },
     // Add more chat objects if needed
   ];

    const handleChatPress = (chatName) => {
       navigation.navigate('SingleChat', { chatName });
     };

   // Render each chat item in the FlatList
   const renderItem = ({ item }) => (
       <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item.name)}>
         <Text style={styles.chatName}>{item.name}</Text>
       </TouchableOpacity>
     );

   const handleSignOut = () => {
     //would remove const handleSignOut = () => { if code bellow worked
       // Have commented out so the navigation still works
        {/* const logout = async () => {
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
       <FlatList
         data={chats}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         contentContainerStyle={styles.listContainer}
       />
       <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
         <Text style={styles.buttonText}>Sign Out</Text>
       </TouchableOpacity>
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingHorizontal: 20,
     paddingTop: 20,
   },
   listContainer: {
     flexGrow: 1,
   },
   chatItem: {
     borderBottomWidth: 1,
     borderBottomColor: '#ddd',
     paddingVertical: 16,
   },
   chatName: {
     fontSize: 18,
   },
   signOutButton: {
     backgroundColor: 'red',
     paddingVertical: 8, // Adjust the padding to make the button smaller
     paddingHorizontal: 16, // Adjust the padding to make the button smaller
     borderRadius: 5,
     marginTop: 20,
     alignSelf: 'center', // Center the button horizontally
     marginBottom: 20, // Add margin at the bottom to separate it from the chat list
   },
   buttonText: {
     color: 'white',
     fontSize: 16, // Decrease the font size to fit the smaller button
     fontWeight: 'bold',
     textAlign: 'center',
   },
 });

 export default ChatsScreen;

