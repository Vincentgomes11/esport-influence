import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';


function CampaignDetail({takeToken, navigation}) {

    const [campaignDetails, setCampaignDetails] = useState([])

    const IdFromParams = navigation.getParam('IdFromParams', 'NO-ID');

    console.log("campagneID", IdFromParams)
    console.log("<token", takeToken)


    useEffect(() => {
        async function getCampaign() {
        const response = await fetch('http://192.168.0.19:3000/get-campaign-details/'+IdFromParams)
        const jsonResponse = await response.json()
        console.log('jsonR',jsonResponse)
        setCampaignDetails(jsonResponse.returnCampaign)
    }
    getCampaign()
      }, [IdFromParams]) 
    
    
    const applyCampaign = async () => {

        const data = await fetch('http://192.168.0.19:3000/campaign-apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${IdFromParams}&token=${takeToken}`
        })

        console.log(data.body + "HELLO add campaign")

    }
    return (
        <Provider>
        <Menu    
             visible={visible}
             onDismiss={closeMenu}
             anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
             <Menu.Item onPress={() => navigation.navigate('MyRequests')} title="My Requests" />
             <Menu.Item onPress={() => navigation.navigate('ProfileInfluencer')} title="Profile" />
             <Divider />
             <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
           </Menu>
        <View style={styles.regform}>
<Card>
  <Card.Title>{campaignDetails.campaignName}
</Card.Title>
  <Card.Divider/>
    <Text style={{marginBottom: 10}}>
    {campaignDetails.description}
   </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      onPress={() => applyCampaign()}

      title='Apply' />
</Card>
</View>

</Provider>

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
         marginTop: 50, 
         width: '95%', 
         marginLeft: 10,
         textAlign: "center"

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

function mapStateToProps(state) {
    return { takeToken : state.token }
  }
  

  export default connect(
    mapStateToProps,
    null
  )(CampaignDetail)