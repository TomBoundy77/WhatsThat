import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactsScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Render each contact item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactName}>{item.name}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

// Function to handle sign-out
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

  const deleteItem = async (id) => {
    try {
      const token = 'd55958b384bb728ffd88208712cb99f9'; // Replace with your actual token
      if (!token) {
        console.log('Token not found. User not signed in.');
        navigation.navigate('SignIn');
        return;
      }

      const response = await fetch(`http://localhost:3333/api/1.0.0/user/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Authorization': token,
        },
      });

      if (response.status === 200) {
        // Successfully deleted the contact
        // Now fetch the updated list of contacts
        getData();
      } else if (response.status === 401) {
        console.log('Unauthorized');
        await AsyncStorage.removeItem('whatsthat_session_token');
        await AsyncStorage.removeItem('whatsthat_user_id');
        navigation.navigate('SignIn');
      } else if (response.status === 404) {
        console.log('Not Found');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log('Error deleting contact:', error);
    }
  };

  const getData = async () => {
    try {
      const token = 'd55958b384bb728ffd88208712cb99f9'; // Replace with your actual token
      if (!token) {
        console.log('Token not found. User not signed in.');
        navigation.navigate('SignIn');
        return;
      }

      const response = await fetch('http://localhost:3333/api/1.0.0/contacts', {
        method: 'GET',
        headers: {
          'X-Authorization': token,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setContacts(data); // Update the state with the fetched contacts
      } else if (response.status === 401) {
        console.log('Unauthorized');
        await AsyncStorage.removeItem('whatsthat_session_token');
        await AsyncStorage.removeItem('whatsthat_user_id');
        navigation.navigate('SignIn');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log('Error fetching contacts:', error);
    } finally {
      setIsLoading(false); // Set isLoading to false after data is fetched (whether successful or not)
    }
  };

  useEffect(() => {
    getData(); // Fetch contacts when the component mounts
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Use toString() to convert the ID to a string
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 16,
  },
  contactName: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
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







