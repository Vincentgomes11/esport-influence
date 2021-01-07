import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Button } from 'react-native-elements'
import { Divider, Menu, Provider } from 'react-native-paper';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default function HomeScreen({ navigation }) {

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
     
     <Menu    
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
          <Menu.Item onPress={() => navigation.navigate('SignIn')} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
        
    <View style={styles.regform}>
    
      <Text style={styles.header}>Welcome on Esport-Influence App</Text>
      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>
      <Text style={styles.secondtitle}>Sign-in with your account : </Text>
      
      <TouchableOpacity style={styles.button}>
        <Button style={styles.btntext} onPress={() => navigation.navigate('SignIn')}  title="Sign in"/>
      </TouchableOpacity>
      <Text style={styles.secondtitle}>Sign-up here if you are a Brand :</Text>
      <TouchableOpacity style={styles.button}>
        <Button onPress={() => navigation.navigate('RegisterBrand')} style={styles.btntext} title="Sign up as a Brand" />
      </TouchableOpacity>

      <Text style={styles.secondtitle}>Sign-up here if you are an Influencer :</Text>
      <TouchableOpacity style={styles.button}>
        <Button onPress={() => navigation.navigate('RegisterInfluencer')} style={styles.btntext} title="Sign up as an Influencer" />
      </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
    </Provider>

  )
}

const styles = StyleSheet.create({
  regform: {
    alignSelf: 'stretch',
    backgroundColor: '#65119C',
    height: '95%', 

  },
  menuh : {
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    textAlign: "center",
    marginTop: 50, 
    
  },
  secondtitle: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 2,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    textAlign: "center",
    marginTop: 10, 
    
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 20,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    marginLeft:10

  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    marginTop: 15,
    color: 'black',
    
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  }
});




