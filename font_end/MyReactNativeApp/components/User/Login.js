import React, { useContext, useState } from 'react';
import { ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Style from "../../components/User/Style";
import API, { authApi, endpoints } from '../../configs/API';
import MyContext from "../../configs/MyContext";
import MyStyle from '../../styles/MyStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)


const Login = ({ navigation }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    const login = async () => {
        setLoading(true);
        try {
            let res = await API.post(endpoints['login'], {
                "grant_type": "password",
                "username": username,
                "password": password,
                "client_id": "Eewq64ohfgpLRWDh1pZzxueTUma6kp5HY9XBi8bJ",
                "client_secret": "AtOaA532oktZXWhcd01As0hq5onItVFXgULf3OUVobWHVwz4202Hc8ZP1hNyiF7c8VXd2VGrSe2CrWalo6amwY3NM7fHNlbTM9irJOc5s5NBZ2kEkxbkSDkFSXpPRJPd",
            });
            console.info(res.data);

            await AsyncStorage.setItem("access-token", res.data.access_token)
            let user = await authApi(res.data.access_token).get(endpoints['current-user']);
            dispatch({
                type: "login",
                payload: user.data
            });
            console.info("access_token: " + res.data.access_token)
            
            navigation.navigate("Home");

        } catch (ex) {
            console.error(ex);
            console.info("loi login");
        } finally {
            setLoading(false);
        }
    }

    return (
        <DismissKeyboard>


            <View style={MyStyle.container}>
                <Text style={MyStyle.subject}>ĐĂNG NHẬP</Text>

                <TextInput value={username} onChangeText={t => setUsername(t)} style={Style.input} placeholder="Tên đăng nhập..." />
                <TextInput secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} style={Style.input} placeholder="Mật khẩu..." />

                {loading === true ? <ActivityIndicator /> : <>
                    <TouchableOpacity onPress={login}>
                        <Text style={Style.button}>Đăng nhập</Text>
                    </TouchableOpacity>
                </>}

            </View>
        </DismissKeyboard>
    );
}

export default Login;