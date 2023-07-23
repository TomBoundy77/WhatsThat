import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactsScreen = ({ navigation }) => {
  // Sample list of contacts
  const contacts = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mark Johnson' },
    // Add more contact objects if needed
  ];

  // Render each contact item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
    </View>
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

  const handleAddContact = () => {
    navigation.navigate('AddNewUser'); // Navigate to the AddNewUserScreen
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
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
    contactItem: {
       borderBottomWidth: 1,
       borderBottomColor: '#ddd',
       paddingVertical: 16,
  },
  contactName: {
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ContactsScreen;





