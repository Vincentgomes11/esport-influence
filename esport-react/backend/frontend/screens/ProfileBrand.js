import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';

function ProfileBrand({ takeToken }) {
    
    const [companyDetails, setCompanyDetails] = useState([])
  
    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`http://192.168.0.19:3000/branddetails?brandToken=${props.token}`)
          const jsonResponse = await response.json()
    
          setCompanyDetails(jsonResponse.brandProfil)
        }
        fetchData()
      }, []) 

    return (
<Provider>
            <Menu    
                      visible={visible}
                      onDismiss={closeMenu}
                      anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
                      <Menu.Item onPress={() => navigation.navigate('ChoiceInfluencer')} title="Response Request" />
                      <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="Create campaign" />
                      <Divider />
                      <Menu.Item onPress={() => navigation.navigate('MyCampaigns')} title="My Campaigns" />
                    </Menu>
                    <View style={styles.regform}>       
                             <ScrollView>
        <Card>
          <Card.Title>{companyDetails.company}
        </Card.Title>
            <Text style={{marginBottom: 10}}>
            {companyDetails.bio}
            </Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.firstName}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.lastName}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.phone}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.email}</Text>
        </Card>
        </ScrollView>
            </View>
            </Provider>
        
            )
        }

        function mapStateToProps(state) {
            return { token: state.token }
          }
          
          export default connect(
            mapStateToProps,
            null
          )(ProfileBrand)