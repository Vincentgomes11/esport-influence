import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'

import HomeScreen from './screens/HomeScreen';
import RegisterBrand from './screens/RegisterBrand';
import RegisterInfluencer from './screens/RegisterInfluencer';
import SignIn from './screens/SignIn';
import CreateCampaign from './screens/CreateCampaign';
import CampaignList from './screens/CampaignList';
import CampaignDetail from './screens/CampaignDetail';
import CampaignListComponent from './screens/CampaignListComponent';
import ChoiceInfluencer from './screens/ChoiceInfluencer';
import MyCampaigns from './screens/MyCampaigns';
import MyCampaignsListComponent from './screens/MyCampaignsListComponent'
import MyRequests from './screens/MyRequests';
import MyRequestList from './screens/MyRequestList';
import ProfileInfluencer from './screens/ProfileInfluencer';
import ProfileBrand from './screens/ProfileBrand';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import { createStore, combineReducers } from 'redux'
import {Provider} from 'react-redux';
import token from './reducers/token';
import campaign from './reducers/campaign'

const store = createStore(combineReducers({token, campaign}))

// var BottomTabNavigatorBrand = createBottomTabNavigator({ 
//   CreateCampaign: CreateCampaign,
//   ChoiceInfluencer : ChoiceInfluencer,
//   MyCampaigns : MyCampaigns,
//   ProfileBrand : ProfileBrand
// })
// var StackNavigatorBrand = createStackNavigator({ 
//   HomeScreen : HomeScreen,
//   BottomTabNavigatorBrand : BottomTabNavigatorBrand,
//   RegisterBrand:  RegisterBrand,  
//   RegisterInfluencer: RegisterInfluencer,
//   SignIn: SignIn,
//   CreateCampaign: CreateCampaign,
//   CampaignList: CampaignList,
//   CampaignDetail : CampaignDetail,
//   CampaignListComponent : CampaignListComponent,
//   ChoiceInfluencer : ChoiceInfluencer,
//   MyCampaigns : MyCampaigns,
//   MyCampaignsListComponent : MyCampaignsListComponent,
//   MyRequests : MyRequests,
//   MyRequestList : MyRequestList,
//   ProfileInfluencer : ProfileInfluencer,
//   ProfileBrand : ProfileBrand
// })
// var BottomTabNavigatorInfluencer = createBottomTabNavigator({ 
//   CampaignList: CampaignList,
//   MyRequests : MyRequests,
//   ProfileInfluencer : ProfileInfluencer,
// })

// var StackNavigatorInfluencer = createStackNavigator({ 
//   HomeScreen : HomeScreen,
//   RegisterBrand:  RegisterBrand,  
//   RegisterInfluencer: RegisterInfluencer,
//   SignIn: SignIn,
//   CreateCampaign: CreateCampaign,
//   CampaignList: CampaignList,
//   CampaignDetail : CampaignDetail,
//   CampaignListComponent : CampaignListComponent,
//   ChoiceInfluencer : ChoiceInfluencer,
//   MyCampaigns : MyCampaigns,
//   MyCampaignsListComponent : MyCampaignsListComponent,
//   MyRequests : MyRequests,
//   MyRequestList : MyRequestList,
//   ProfileInfluencer : ProfileInfluencer,
//   ProfileBrand : ProfileBrand
// })

var StackNavigator = createStackNavigator({ 
  HomeScreen : HomeScreen,
  RegisterBrand:  RegisterBrand,  
  RegisterInfluencer: RegisterInfluencer,
  SignIn: SignIn,
  CreateCampaign: CreateCampaign,
  CampaignList: CampaignList,
  CampaignDetail : CampaignDetail,
  CampaignListComponent : CampaignListComponent,
  ChoiceInfluencer : ChoiceInfluencer,
  MyCampaigns : MyCampaigns,
  MyCampaignsListComponent : MyCampaignsListComponent,
  MyRequests : MyRequests,
  MyRequestList : MyRequestList,
  ProfileInfluencer : ProfileInfluencer,
  ProfileBrand : ProfileBrand
})

const Navigation = createAppContainer(StackNavigator);


export default function App() {

  return (
    <Provider store={store}>
    <Navigation/>
    </Provider>

)}

