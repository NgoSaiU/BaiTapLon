import React, { useContext, useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Style from "../../components/User/Style";
import API, { authApi, endpoints } from '../../configs/API';
import MyContext from "../../configs/MyContext";
import MyStyle from '../../styles/MyStyles';

const Login = ({ navigation }) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);

    // const login = () => {
    //     if (username === 'admin' && password === '123') {
    //         dispatch({
    //             type: 'login',
    //             payload: {
    //                 "username": 'admin'
    //             }
    //         })
    //     }
    // }

    const login = async () => {
        setLoading(true);
        try {
            let res = await API.post(endpoints['login'], {
                "username": username,
                "password": password,
                "client_id": "HmwZ6eFN7iLeSl3pmqqoilgrRPk4HD1tembFrIat",
                "client_secret": "8CwdW0dMU4sTYgOnQj20RIzIv8Ch0zsXlvsstT0KHHCgq9xyQmj3WyZMPQF3tTwXrmVMgTSOvxp0fRcY0OuaJ1df10IIMHRLInYrBf4tCOhPAxNEWrRr8p78gglqVDI0",
                "grant_type": "password"
            });
            // let res = await API.post(endpoints['posts']);
            console.info(res.data);
        } catch (e) {
            console.error(e);
            console.info("Lỗi rồi ông ơi")
        } finally {
            setLoading(false);
        }
    }

    // const login = async () => {
    //     setLoading(true);

    //     try {
    //         let res = await API.post(endpoints['login'], {
    //             "username": username,
    //             "password": password,
    //             "client_id": "iaL2868ctytxIToJHDkm9S39lCRPa2gJ12j9kaxh",
    //             "client_secret": "TGMSVnIsFGzoOKB4bg5Fyt65E8C2fQaA0gyuBixSDKRaB9RrhhLdC2Zr6oxnmgdEs1lPF8wYRpJ3xokEabE1pSBNH0JTsFrBqpn58nJ7BcMkw6akEKLh4TTIHOXGcQEx",
    //             "grant_type": "password"
    //         });

    //         await AsyncStorage.setItem("access-token", res.data.access_token)
    // let user = await authApi(res.data.access_token).get(endpoints['current-user']);
    // dispatch({
    //     type: "login",
    //     payload: user.data
    // });
    // navigation.navigate("Home");ss
    //     } catch (ex) {
    //         console.error(ex);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    return (
        <View style={MyStyle.container}>
            <Text style={MyStyle.subject}>ĐĂNG NHẬP</Text>
            <TextInput value={username} onChangeText={t => setUsername(t)} style={Style.input} placeholder="Tên đăng nhập..." />
            <TextInput secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} style={Style.input} placeholder="Mật khẩu..." />

            {/* <TextInput style={Style.input} placeholder="Tên đăng nhập..." />
            <TextInput style={Style.input} placeholder="Mật khẩu..." /> */}

            <TouchableOpacity onPress={login}>
                <Text style={Style.button}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* {loading === true ? <ActivityIndicator /> : <>
                <TouchableOpacity onPress={login}>
                    <Text style={Style.button}>Đăng nhập</Text>
                </TouchableOpacity>
            </>} */}
        </View>
    )
}

export default Login;