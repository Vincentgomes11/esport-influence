import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';
import CampaignListComponent from '../screens/CampaignListComponent'

function CampaignList() {

    
const [campaignList, setCampaignList] = useState([])

useEffect(() => {
    async function fetchData() {
    const response = await fetch('http://192.168.0.19:3000/get-campaign')
    const jsonResponse = await response.json()
    console.log('jsonResponse', jsonResponse)
    setCampaignList(jsonResponse.campaignListItem)
}
fetchData()
  }, []);

  var campaignListItems = campaignList.map((campaign, i) => {
    return (<CampaignListComponent key={i} campaignId={campaign._id} campaignName={campaign.campaignName} campaignDesc={campaign.description} campaignImg={campaign.img} globalRating={campaign.note} globalCountRating={campaign.vote} campaignUpload={campaign.uploadedDoc} />)
})

    return (

        <View style={styles.regform}>
<ScrollView>

            {campaignListItems}
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

export default CampaignList ;
