import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const BlockedUsersScreen = ({ navigation }) => {
  // Sample list of blocked users
  const blockedUsers = [
    { id: '1', name: 'Blocked User 1' },
    { id: '2', name: 'Blocked User 2' },
    { id: '3', name: 'Blocked User 3' },
    // Add more blocked user objects if needed
  ];

  // Render each blocked user item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.blockedUserItem}>
      <Text style={styles.blockedUserName}>{item.name}</Text>
    </View>
  );

  // Function to handle sign-out
  const handleSignOut = () => {
    // Add your sign-out logic here, e.g., clearing user session, navigating to sign-in screen
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={blockedUsers}
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
    blockedUserItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 16,
    },
    blockedUserName: {
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

export default BlockedUsersScreen;


