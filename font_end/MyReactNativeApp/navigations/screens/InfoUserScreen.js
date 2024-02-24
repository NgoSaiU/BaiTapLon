import { Text, View, StyleSheet } from "react-native";
import React, { useReducer } from 'react';

import Login from '../../components/User/Login'
import MyUserReducer from "../../reducers/MyUserReducer";
import Register from "../../components/User/Register";

const InfoUserScreen = ({ navigation }) => {
    const [user, dispatch] = useReducer(MyUserReducer, null);

    return (
        // Nếu user chưa đăng nhập thì hiển thị label đăng nhập hoặc đăng ký ? hiển thị thông tin username
        <View style={styles.container}>
            {/* <Text>Info User</Text> */}
            {user === null ? <>
                {/* <Text> Usser is: {user.username}</Text> */}
                <Login />
                {/* <Register/> */}
            </> : <>
                <Text>Chào {user.username}</Text>
            </>}

        </View>
    )

}


export default InfoUserScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});