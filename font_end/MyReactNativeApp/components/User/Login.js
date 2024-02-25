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
                "client_id": "AO9EwM6RY9N0UcfG6yNclWN9SFkLkepy367YpwTI",
                "client_secret": "GYu5aoYM8AO248x1xRV8oJZXMYJLdwX7zbYA2Sbj2eTGg0WAIg7E8BR9pPLxHwCQSt1WSaklKDzfzNMYRJaJwcbt5LrsdttyyW6SLKUxwCw3iqmYeK7mcei0PpY8eZmW",
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