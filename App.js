import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from expo/vector-icons

import SignInScreen from './components/SignInScreen';
import HomeScreen from './components/HomeScreen';
import AddNewUserScreen from './components/AddNewUserScreen';
import ChatsScreen from './components/ChatsScreen';
import BlockedUsersScreen from './components/BlockedUsersScreen';
import SingleChatScreen from './components/SingleChatScreen';
import ContactsScreen from './components/ContactsScreen';
import AddContactScreen from './components/AddContactScreen';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="BlockedUsers"
        component={BlockedUsersScreen}
        options={{
          tabBarLabel: 'Blocked Users',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="Home" component={HomeStack} />
        <AuthStack.Screen name="AddNewUser" component={AddNewUserScreen} />
        <AuthStack.Screen name="SingleChat" component={SingleChatScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default App;









