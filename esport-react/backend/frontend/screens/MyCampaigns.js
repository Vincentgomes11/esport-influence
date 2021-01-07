import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { connect } from 'react-redux';
import MyCampaignsListComponent from '../screens/MyCampaignsListComponent'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import HomeScreen from '../screens/HomeScreen';
import RegisterBrand from '../screens/RegisterBrand';
import RegisterInfluencer from '../screens/RegisterInfluencer';
import SignIn from '../screens/SignIn';
import CreateCampaign from '../screens/CreateCampaign';
import CampaignList from '../screens/CampaignList';
import CampaignDetail from '../screens/CampaignDetail';
import ChoiceInfluencer from '../screens/ChoiceInfluencer';
import MyRequests from '../screens/MyRequests';
import MyRequestList from '../screens/MyRequestList';
import ProfileInfluencer from '../screens/ProfileInfluencer';
import ProfileBrand from '../screens/ProfileBrand';

function MyCampaigns({ takeToken }) {

    const [myCampaignList, setMyCampaignList] = useState([])
    const [companyCampaign, setCompanyCampaign] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://192.168.0.19:3000/mycampaign?companyToken=${takeToken}`)
            const jsonResponse = await response.json()
            console.log('jsonR', jsonResponse)
            setMyCampaignList(jsonResponse.myCampaign)
            setCompanyCampaign(jsonResponse.company)


        }

        fetchData()
    }, [takeToken])

    console.log("company", companyCampaign);
    console.log("list campagne", myCampaignList);


    var returnList = myCampaignList.map((mycampaign, i) => {

        return (<MyCampaignsListComponent key={i} campaignName={mycampaign.campaignName} campaignDesc={mycampaign.description} campaignStatus={mycampaign.status} campaignImage={mycampaign.uploadedDoc} />)
    })


    if (myCampaignList.length > 0) {

        return (
            <Provider>
            <Menu    
                      visible={visible}
                      onDismiss={closeMenu}
                      anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
                      <Menu.Item onPress={() => navigation.navigate('ChoiceInfluencer')} title="Response Request" />
                      <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="CreateCampaign" />
                      <Divider />
                      <Menu.Item onPress={() => navigation.navigate('ProfileBrand')} title="Profile" />
                    </Menu>
                    <View style={styles.regform}>       
                             <ScrollView>
                    {returnList}
                    </ScrollView>
            </View>
            </Provider>

        )
    } else {
        return (
            <Provider>
<Menu    
                      visible={visible}
                      onDismiss={closeMenu}
                      anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
                      <Menu.Item onPress={() => navigation.navigate('ChoiceInfluencer')} title="Response Request" />
                      <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="CreateCampaign" />
                      <Divider />
                      <Menu.Item onPress={() => navigation.navigate('ProfileBrand')} title="Profile" />
                    </Menu>
                    <View style={styles.regform}>   
            <Card>
            <Card.Title>Campaigns Section
          </Card.Title>
              <Text style={{marginBottom: 10}}> No campaign</Text>
              
          </Card>

          </View>
          </Provider>


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
)(MyCampaigns)