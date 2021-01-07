import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';

function MyCampaignsListComponent(props) {

    return (

<Card>
  <Card.Title>{props.campaignName}
</Card.Title>
    <Text style={{marginBottom: 10}}>
    Status: {props.campaignStatus}
    </Text>
    <Text style={{marginBottom: 10}}>
    {props.campaignDesc}
    </Text>
</Card>

    )
}
export default MyCampaignsListComponent