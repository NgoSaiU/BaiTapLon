import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Icon } from 'react-native-vector-icons/icon';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import { Icon } from 'react-native-vector-icons/icon';

//Screens
import HomeScreen from './screens/HomeScreen'
import FavoriteScreen from './screens/FavouriteScreen'
import InfoUserScreen from './screens/InfoUserScreen'
import NotificationScreen from './screens/NotificationScreen'

const homeName = 'Home';
const favoriteName = 'Favourite';
const infoUserName = 'InfoUserName';
const notificationName = 'notificationHome';

const Tab = createBottomTabNavigator() 

const MainContainer = () => {

    return ( 
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home': 'home-outline';
                        } else if (rn === favoriteName) {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (rn === infoUserName) {
                            iconName = focused ? 'person' : 'person-outline';
                        } else if (rn === notificationName) {
                            iconName = focused ? 'notifications' : 'notifications-outline';
                        }

                        return <Ionicons name = {iconName} size={size} color={color}/>;

                    },
                })}
                tabBarOptions={{
                    
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'grey',
                    labelStyle: {paddingBottom: 10, fontSize:10},
                    style: {padding: 10, height: 200}
                }}
                >
        
                {/* tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray', */}

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={favoriteName} component={FavoriteScreen}/>
                <Tab.Screen name={infoUserName} component={InfoUserScreen}/>
                <Tab.Screen name={notificationName} component={NotificationScreen}/>

            </Tab.Navigator>

        </NavigationContainer>
    )
}

export default MainContainer;

// https://ionic.io/ionicons