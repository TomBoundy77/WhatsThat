import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class AddNewUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      error: '',
      submitted: false,
    };
  }

addUser = () => {
  // Call the API to add a new user
  return fetch('http://localhost:3333/api/1.0.0/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "password": this.state.password,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error("Email already exists or password isn't strong enough");
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((rJson) => {
      // rJson should contain the data sent by the server in response to the 201 (Created) request
      const userId = rJson.id; // Assuming the unique ID returned by the server is named 'id'

      this.setState({ error: 'User added successfully', submitted: false });
      this.props.navigation.navigate('SignIn');
    })
    .catch((error) => {
      this.setState({ error: error.message, submitted: false });
    });
};


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fill in the form and click add to register</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={this.state.first_name}
          onChangeText={(text) => this.setState({ first_name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={this.state.last_name}
          onChangeText={(text) => this.setState({ last_name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            this.addUser();
            this.setState({ submitted: true });
          }}
          disabled={this.state.submitted}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddNewUserScreen;


