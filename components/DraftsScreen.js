// DraftsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

const DraftsScreen = ({ navigation }) => {
  const [drafts, setDrafts] = useState([]);

  const getDrafts = async () => {
    try {
      const draftKeys = await AsyncStorage.getAllKeys();
      const drafts = await AsyncStorage.multiGet(draftKeys);
      setDrafts(drafts.map(([key, value]) => ({ id: key, message: value })));
    } catch (error) {
      console.log('Error fetching drafts:', error);
    }
  };

  useEffect(() => {
    navigation.addListener('focus', getDrafts);
    return () => {
      navigation.removeListener('focus', getDrafts);
    };
  }, []);

  const handleEditDraft = (draft) => {
    navigation.navigate('SingleChat', { draft });
  };

  const handleDeleteDraft = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      getDrafts();
    } catch (error) {
      console.log('Error deleting draft:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.draftItem}>
      <Text style={styles.draftMessage}>{item.message}</Text>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditDraft(item)}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteDraft(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={drafts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  draftItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 16,
  },
  draftMessage: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DraftsScreen;
