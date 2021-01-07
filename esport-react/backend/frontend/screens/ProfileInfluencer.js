import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';

function ProfileInfluencer({ takeToken }) {
    
    const [influencerDetails, setInfluencerDetails] = useState([])
  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`http://192.168.0.19:3000/influencerdetails?influencerToken=${takeToken}`)
        const jsonResponse = await response.json()
  
        setInfluencerDetails(jsonResponse.influencerProfil)
      }
      fetchData()
    }, [])
    return (
        <Provider>
        <Menu    
             visible={visible}
             onDismiss={closeMenu}
             anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
             <Menu.Item onPress={() => navigation.navigate('MyRequests')} title="My Requests" />
             <Menu.Item onPress={() => navigation.navigate('CampaignList')} title="Search Campaign" />
             <Divider />
             <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
           </Menu>
        <View style={styles.regform}>

        <Text style={styles.header}>Profile</Text>
        <KeyboardAvoidingView>

        <ScrollView>

        <Card>
          <Card.Title>{influencerDetails.firstName}
        </Card.Title>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.lastName}
            </Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.phone}
            </Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.email}</Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.favoriteGame}</Text>
        </Card>
        </ScrollView>
            </KeyboardAvoidingView>
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
        function mapStateToProps(state) {
            return { token: state.token }
          }
          
          export default connect(
            mapStateToProps,
            null
          )(ProfileInfluencer)