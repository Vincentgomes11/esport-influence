import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';


 function CreateCampaign({navigation, takeToken}) {

    const [nameCampaign, setNameCampaign] = useState('')
    const [description, setDescription] = useState('') 
    const [audienceMin, setAudienceMin] = useState('') 
    const [audienceMax, setAudienceMax] = useState('') 
    const [uploadDoc, setUploadDoc] = useState('')
    const [redirect, setRedirect] = useState(false)

    var handleSubmitCreateCampaign = async () => {

        console.log("début handle submit")

        const data = await fetch('http://192.168.0.19:3000/addcampaign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nameCampaignFromFront=${nameCampaign}&descriptionFromFront=${description}&audienceMinFromFront=${audienceMin}&audienceMaxFromFront=${audienceMax}&uploadDocFromFront=${uploadDoc}&token=${takeToken}`
        })
        console.log(data.body + "Data.body")

        const body = await data.json()
        console.log("create campaign", body)
    }
    return (

        <View style={styles.regform}>

            <Text style={styles.header}>Create a campaign</Text>

            <ScrollView>

            <TextInput onChangeText={(val) => setNameCampaign(val)} style={styles.textinput} placeholder="Campaign Name" placeholderTextColor="#fff"/>

            <TextInput onChangeText={(val) => setDescription(val)} style={styles.textinput} placeholder="Description" placeholderTextColor="#fff"/>
            <TextInput onChangeText={(val) => setAudienceMin(val)} style={styles.textinput} placeholder="Audience min" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setAudienceMax(val)} style={styles.textinput} placeholder="Audience max" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setUploadDoc(val)} style={styles.textinput} secureTextEntry={true} placeholder="Upload Url Image" placeholderTextColor="#fff" />

            <TouchableOpacity style={styles.button}>
                <Button onPress={() => {handleSubmitCreateCampaign()}} style={styles.btntext} title="Create"/>
            </TouchableOpacity>

            {redirect ? navigation.navigate('MyCampaigns') : null }
            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 10,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    return { takeToken: state.token }
  }
  

  export default connect(
    mapStateToProps,
    null
  )(CreateCampaign)