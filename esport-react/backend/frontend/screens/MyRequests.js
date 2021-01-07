import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,  } from 'react-native';
import { Button, Card} from 'react-native-elements'
import { connect } from 'react-redux';
import MyRequestList from '../screens/MyRequestList'

function MyRequests({ takeToken }) {

    const [returnCampaignDetailList, setReturnCampaignDetailList] = useState([])
    const [returnBrand, setReturnBrand] = useState([])
 


    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`http://192.168.0.19:3000/get-request-list-influencer?influencerToken=${takeToken}`)
        const jsonResponse = await response.json()
        console.log('jsonR',jsonResponse)
        setReturnCampaignDetailList(jsonResponse.returnCampaignDetail)
        setReturnBrand(jsonResponse.brand)


    }
    fetchData()
      }, [takeToken])



    var returnRequestList = returnCampaignDetailList.map((mycampaign, i) => {
    
        return (<MyRequestList key={i} campaignName={mycampaign.campaignName} campaignStatus={mycampaign.status} campaignDesc={mycampaign.description} campaignUpload={mycampaign.uploadedDoc}/>)
    })


    if (returnCampaignDetailList.status == 'Waiting' || 'Accepted'|| 'Refused') {

        return (
        <Provider>
     
            <Menu    
                 visible={visible}
                 onDismiss={closeMenu}
                 anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
                 <Menu.Item onPress={() => navigation.navigate('CampaignList')} title="Search campaign" />
                 <Menu.Item onPress={() => navigation.navigate('ProfileInfluencer')} title="Profile" />
                 <Divider />
                 <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
               </Menu>
            <View style={styles.regform}>
                      <Text style={styles.header}>My last requests</Text>

                <ScrollView>
                    {returnRequestList}
                </ScrollView>

            </View>
            </Provider>

        )
    } else {
        return (

            <View style={styles.regform}>

            <Card>
            <Card.Title>Campaigns Section
          </Card.Title>
              <Text style={{marginBottom: 10}}> No Request</Text>
              
          </Card>
          <Button title="Profile"/>
          </View>

        )
    }




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
)(MyRequests)