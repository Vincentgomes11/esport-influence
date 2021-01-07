import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';

import {connect} from 'react-redux';


function RegisterInfluencer({onSubmitToken, navigation}) {

    const [signUpUserNameInfluencer, setSignUpUserNameInfluencer] = useState('')
    const [signUpFirstName, setSignUpFirstName] = useState('')
    const [signUpLastName, setSignUpLastName] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpPhone, setSignUpPhone] = useState('')
    const [signUpFollowerInfluencer, setSignUpFollowerInfluencer] = useState('')
    const [signUpFavoriteGamesInfluencer, setSignUpFavoriteGamesInfluencer] = useState('')
    const [signUpUrlSocialNetworkInfluencer, setSignUpUrlSocialNetworkInfluencer] = useState('')
    const [bioInfluencer, setBioInfluencer]= useState('')

    const [redirect, setRedirect] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignup, setErrorsSignup] = useState([])
    const [isConnect, setIsConnect] = useState(false)
    const [isNotConnect, setIsNotConnect] = useState('')
    const [token, setToken] = useState('')
    const [tokenIsSubmited, setTokenIsSubmited] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, value) => {
          if (value) {
            setToken(value);
            onSubmitToken(value);
            setTokenIsSubmited(true);
          }
        })
      }, []);

    var handleSubmitSignupInfluencer = async () => {

        console.log("début handle submit")

        const data = await fetch('http://192.168.0.19:3000/sign-up/influencer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstNameFromFront=${signUpFirstName}&lastNameFromFront=${signUpLastName}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&bioFromFront=${bioInfluencer}&phoneFromFront=${signUpPhone}&numberFollowerFromFront=${signUpFollowerInfluencer}&favoriteGameFromFront=${signUpFavoriteGamesInfluencer}&urlSocialNetworkFromFront=${signUpUrlSocialNetworkInfluencer}`
        })
        console.log(data.body + "HELLO WORLD")

        const body = await data.json()
        console.log("Body sign up influencer", body)
        if (body.result == true) {
            onSubmitToken(body.saveUser.token)
            AsyncStorage.setItem('userToken', body.saveUser.token);
            setUserExists(true)
            setRedirect(true)
          } else {
            setErrorsSignup(body.error)
          }
        }
        var tabErrorsSignup = listErrorsSignup.map((error,i) => {
          return(<p>{error}</p>)
        })
    
    
    return (

        <View style={styles.regform}>

            <Text style={styles.header}>Sign-up as an Influencer</Text>
            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>
            <ScrollView>

            <TextInput onChangeText={(val) => setSignUpUserNameInfluencer(val)} style={styles.textinput} placeholder="Username" placeholderTextColor="#fff"/>

            <TextInput onChangeText={(val) => setSignUpFirstName(val)} style={styles.textinput} placeholder="First Name" placeholderTextColor="#fff"/>
            <TextInput onChangeText={(val) => setSignUpLastName(val)} style={styles.textinput} placeholder="Last Name" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpEmail(val)} style={styles.textinput} placeholder="Email" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpPassword(val)} style={styles.textinput} secureTextEntry={true} placeholder="Password" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpPhone(val)} style={styles.textinput} placeholder="Phone" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setBioInfluencer(val)} style={styles.textinput} placeholder="Bio" placeholderTextColor="#fff" />
            {/* <TextInput onChangeText={(val) => setSignUpFollowerInfluencer(val)} style={styles.textinput} placeholder="Number of followers" placeholderTextColor="#fff" /> */}
            {/* <TextInput onChangeText={(val) => setSignUpUrlSocialNetworkInfluencer(val)} style={styles.textinput} placeholder="URL Social Network" placeholderTextColor="#fff" /> */}
            {/* <TextInput onChangeText={(val) => setSignUpFavoriteGamesInfluencer(val)} style={styles.textinput} placeholder="Favorite game" placeholderTextColor="#fff" /> */}

            <TouchableOpacity style={styles.button}>
                <Button onPress={() => {handleSubmitSignupInfluencer()}} style={styles.btntext} title="Sign up"/>
            </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>

    )
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
        backgroundColor: '#59cbbd',
        height: '95%',
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
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
        marginLeft:10

    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

function mapDispatchToProps(dispatch){
    return {
        onSubmitToken: function(token){
        dispatch({type: 'addToken', token: token})
      }
    }
  }
  export default connect(
    null,
    mapDispatchToProps
  )(RegisterInfluencer)