import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

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
    // Implement your sign-out logic here
    // For simplicity, we'll just navigate to the Sign In screen directly
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





