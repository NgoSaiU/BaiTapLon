import { Text, View, StyleSheet } from "react-native";
import React, { useContext, useReducer } from 'react';

import Login from '../../components/User/Login'
import MyUserReducer from "../../reducers/MyUserReducer";
import Register from "../../components/User/Register";
import MyContext from "../../configs/MyContext";
import Logout from "../../components/User/Logout";

const InfoUserScreen = ({ navigation }) => {
    // const [user, dispatch] = useReducer(MyUserReducer, null);
    const [user, dispatch] = useContext(MyContext);

    return (
        // Nếu user chưa đăng nhập thì hiển thị label đăng nhập hoặc đăng ký ? hiển thị thông tin username
        <View style={styles.container}>
            {/* <Text>Info User</Text> */}
            {user === null ? <>
                {/* <Text> Usser is: {user.username}</Text> */}
                <Login navigation={navigation} />
                
                {/* <Register navigation={navigation}/> */}
            </> : <>
                <Text>Chào {user.username}</Text>
                <Text>Role {user.role}</Text>
                <Logout/>

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