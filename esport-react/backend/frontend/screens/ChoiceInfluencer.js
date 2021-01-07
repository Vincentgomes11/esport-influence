import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';

function ChoiceInfluencer({takeToken, navigation}) {

    const [returnCampaignDetailList, setReturnCampaignDetailList] = useState([])
    const [returnInfluenceur, setReturnInfluenceur] = useState([])
  
    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`http://192.168.0.19:3000/get-influencer-request-list?brandToken=${takeToken}`)
          const jsonResponse = await response.json()
          console.log('jsonR', jsonResponse)
          setReturnCampaignDetailList(jsonResponse.returnCampaignDetail)
          setReturnInfluenceur(jsonResponse.influenceur)
        }
    
        fetchData()
      }, [takeToken])
    
      console.log("infos campagne", returnCampaignDetailList);

      const updateStatusAcc = async () => {
        var UpdateStatusAccepted = { ...returnCampaignDetailList }
        UpdateStatusAccepted.status = 'Accepted'
        console.log(UpdateStatusAccepted)
        setReturnCampaignDetailList(UpdateStatusAccepted)

        const data = await fetch('http://192.168.0.19:3000/update-request-acc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${takeToken}`
        })
    
      }


  const updateStatusRef = async () => {


    var UpdateStatusRefused = { ...returnCampaignDetailList }
    UpdateStatusRefused.status = 'Refused'
    console.log(UpdateStatusRefused)

    setReturnCampaignDetailList(UpdateStatusRefused)

    const data = await fetch('http://192.168.0.19:3000/update-request-ref', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${takeToken}`
    })


  }
  if (returnCampaignDetailList.status == 'Waiting') {

    return (
        <Provider>
<Menu    
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
          <Menu.Item onPress={() => navigation.navigate('MyCampaigns')} title="My campaigns" />
          <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="CreateCampaign" />
          <Divider />
          <Menu.Item onPress={() => navigation.navigate('ProfileBrand')} title="Profile" />
        </Menu>
        <ScrollView>
        <View style={styles.regform}>

<Card>
  <Card.Title>{returnCampaignDetailList.campaignName}
</Card.Title>
  <Card.Divider/>
  {/* <Card.Image source={require('https://e.sport.fr/wp-content/uploads/2020/08/bigs-red-bull-flick-key-visual.jpeg')}> */}
    <Text style={{marginBottom: 10}}>
    {returnInfluenceur.userName}
   </Text>
   <Text style={{marginBottom: 10}}>
    Name: {returnInfluenceur.firstName}
   </Text>
   <Text style={{marginBottom: 10}}>
   Bio: {returnInfluenceur.bio}
   </Text>
   <Text style={{marginBottom: 10}}>
   Status: {returnCampaignDetailList.status}
   </Text>
   <Text style={{marginBottom: 10}}>
   Followers: {returnInfluenceur.numberFollower}
   </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      onPress={() => updateStatusAcc()}

      title='Accept' />
        <Button
      icon={<Icon name='code' color='#ffffff' />}
      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
      onPress={() => updateStatusRef()}

      title='Refuse' />
       <Text style={{marginBottom: 10}}>
       {returnInfluenceur.description}        
   </Text>
</Card>
</View>
</ScrollView>

    </Provider>
    )
} else if (returnCampaignDetailList.status == 'Accepted') {

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
        <ScrollView>
        <View style={styles.regform}>


<Card>
  <Card.Title>{returnCampaignDetailList.campaignName}
</Card.Title>
  <Card.Divider/>
  {/* <Card.Image source={require('https://e.sport.fr/wp-content/uploads/2020/08/bigs-red-bull-flick-key-visual.jpeg')}> */}
    <Text style={{marginBottom: 10}}>
    {returnInfluenceur.userName}
   </Text>
   <Text style={{marginBottom: 10}}>
    Name: {returnInfluenceur.firstName}
   </Text>
   <Text style={{marginBottom: 10}}>
   Bio: {returnInfluenceur.bio}
   </Text>
   <Text style={{marginBottom: 10}}>
   Status: {returnCampaignDetailList.status}
   </Text>
   <Text style={{marginBottom: 10}}>
   Followers: {returnInfluenceur.numberFollower}
   </Text>
    
       <Text style={{marginBottom: 10}}>
       {returnInfluenceur.description}        
   </Text>
</Card>
</View>
</ScrollView>

    </Provider>

    )
} else {
    return (
        <View style={styles.regform}>

        <Card>
  <Card.Title>No request
</Card.Title>
  <Card.Divider/>
  {/* <Card.Image source={require('https://e.sport.fr/wp-content/uploads/2020/08/bigs-red-bull-flick-key-visual.jpeg')}> */}

</Card>
</View>

    )
} }

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
  
    
function mapStateToProps(state) {
    return { takeToken : state.token }
  }
  

  export default connect(
    mapStateToProps,
    null
  )(ChoiceInfluencer)