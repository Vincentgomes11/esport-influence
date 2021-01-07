import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

function CampaignListComponent(props) {

    return (

<Card>
  <Card.Title>{props.campaignName}
</Card.Title>
    <Text style={{marginBottom: 10}}>
    {props.campaignDesc}
    </Text>
    <Button
      icon={<Icon name='code' color='#ffffff' />}

      onPress={() => props.navigation.navigate('CampaignDetail', {
        IdFromParams: props.campaignId,
      })}
      title='Select Campaign' />
</Card>

    )
}
function mapDispatchToProps(dispatch){
    return {
        onSubmitCampaign: function(campaignSelected){
        dispatch({type: 'saveCampaign', campaignSelected: campaignSelected})
      }
    }
  }
  export default connect(
    null,
    mapDispatchToProps
  )(withNavigation (CampaignListComponent));

