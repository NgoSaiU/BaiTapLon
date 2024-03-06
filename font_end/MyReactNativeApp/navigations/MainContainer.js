import React, { useContext, useReducer } from 'react';

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
import Management from './screens/Management';
import PostWantHire from './screens/PostWantHire';
import Register from '../components/User/Register';


const homeName = 'Home';
const favoriteName = 'Favourite';
const infoUserName = 'InfoUserName';
const notificationName = 'notificationHome';
const postDetails = 'PostDetails';
const posts = 'Posts';
const postWantHire = 'PostWantHire';
const management = 'Management';

const Tab = createBottomTabNavigator()

const MainContainer = () => {
    const [user, dispatch] = useContext(MyContext);

    // const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        // <MyContext.Provider value={[user, dispatch]}>
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
                            
                        } else if (rn === postWantHire) {
                            iconName = focused ? 'file-tray-stacked' : 'file-tray-stacked-outline';
                        } else if (rn === management) {
                            iconName = focused ? 'grid' : 'grid-outline';
                        } 
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 10, fontSize: 13 },
                    tabBarStyle: { padding: 5, height: 60 }
                })}
            >


                {user === null ? (
                    <>
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name={favoriteName} component={FavoriteScreen} />
                        {/* <Tab.Screen name={notificationName} component={NotificationScreen} /> */}
                        <Tab.Screen name={postWantHire} component={PostWantHire} />
                        <Tab.Screen name={infoUserName} component={InfoUserScreen} />
                        <Tab.Screen name="PostDetails" component={PostDetails} options={{ tabBarItemStyle: { display: "none" } }} />
                        <Tab.Screen name={posts} component={Posts} options={{ tabBarItemStyle: { display: "none" } }} />
                        
                        <Tab.Screen name="Register" component={Register} options={{ tabBarItemStyle: { display: "none" } }} />
                    </>
                ) : (user.role === 'LANDLORD' ? (
                    <>
                        <Tab.Screen name="Home" component={HomeScreen} />
                            <Tab.Screen name="PostDetails" component={PostDetails} options={{ tabBarItemStyle: { display: "none" } }} />
                        <Tab.Screen name={management} component={Management} />
                        <Tab.Screen name={postWantHire} component={PostWantHire} />
                        <Tab.Screen name={infoUserName} component={InfoUserScreen} />
                    </>
                ) : (
                    <>
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name={favoriteName} component={FavoriteScreen} />
                        {/* <Tab.Screen name={notificationName} component={NotificationScreen} /> */}
                        <Tab.Screen name={postWantHire} component={PostWantHire} />
                        <Tab.Screen name={infoUserName} component={InfoUserScreen} />
                        <Tab.Screen name="PostDetails" component={PostDetails} options={{ tabBarItemStyle: { display: "none" } }} />
                        <Tab.Screen name={posts} component={Posts} options={{ tabBarItemStyle: { display: "none" } }} />
                    </>
                )
                )}

            </Tab.Navigator>

        </NavigationContainer>
        // </MyContext.Provider>
    )
}
// Customer: Home: Danh sách bài đăng
//           Favorite: Danh sách bài đăng đã thích
//           PostWantHire: Bài đăng tìm trọ
//           User: Thông tin người dùng => Bài đăng của tôi

// Landlord: Home: Danh sách bài đăng
//           Management: Quản lý bài đăng
//           PostWantHire: Bài đăng tìm trọ
//           User: Thông tin người dùng => có thống kê

export default MainContainer;

// https://ionic.io/ionicons