import { Text, View, StyleSheet } from "react-native";
import React, { useReducer } from 'react';
import MyUserReducer from "../../reducers/MyUserReducer";


const NotificationScreen = ({ navigation }) => {
    
    const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        <View style={styles.container}>
            {user === null ? <>
                <Text>Notification Screen</Text>
            </> : <>
                <Text>Chào {user.username}</Text>
            </>}
        </View>
    )

}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});