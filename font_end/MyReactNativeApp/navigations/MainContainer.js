import React, { useReducer } from 'react';

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
import MyContext from '../configs/MyContext';
import MyUserReducer from '../reducers/MyUserReducer'; 
import PostDetails from '../components/Post/PostDetails';
import Posts from '../components/Post/Posts';



const homeName = 'Home';
const favoriteName = 'Favourite';
const infoUserName = 'InfoUserName';
const notificationName = 'notificationHome';
const postDetails = 'PostDetails';
const posts = 'Posts';

const Tab = createBottomTabNavigator()

const MainContainer = () => {

    const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={homeName}
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            let rn = route.name;

                            if (rn === homeName) {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (rn === favoriteName) {
                                iconName = focused ? 'heart' : 'heart-outline';
                            } else if (rn === infoUserName) {
                                iconName = focused ? 'person' : 'person-outline';
                            } else if (rn === notificationName) {
                                iconName = focused ? 'notifications' : 'notifications-outline';
                            }
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{

                        activeTintColor: 'tomato',
                        inactiveTintColor: 'grey',
                        labelStyle: { paddingBottom: 10, fontSize: 10 },
                        style: { padding: 10, height: 200 }
                    }}
                >

                    {/* tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray', */}

                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name={favoriteName} component={FavoriteScreen} />
                    <Tab.Screen name={notificationName} component={NotificationScreen} />
                    <Tab.Screen name={infoUserName} component={InfoUserScreen} />
                    <Tab.Screen name="PostDetails" component={PostDetails} options={{ tabBarItemStyle: { display: "none" }}} />
                    <Tab.Screen name={posts} component={Posts} options={{ tabBarItemStyle: { display: "none" }}} />

                </Tab.Navigator>

            </NavigationContainer>
        </MyContext.Provider>
    )
}

export default MainContainer;

// https://ionic.io/ionicons