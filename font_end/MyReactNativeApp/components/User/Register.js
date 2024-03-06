import { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Image, TouchableOpacity, StyleSheet, Button, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

import MyStyles from "../../styles/MyStyles";
import Style from "./Style";
import * as ImagePicker from 'expo-image-picker';
import API, { endpoints } from "../../configs/API";
import axios from "axios";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const Register = ({ navigation }) => {
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "email": "",
        "avatar": ""
    });

    const [loading, setLoading] = useState(false);

    const register = async () => {
        setLoading(true);

        const form = new FormData();

        for (let field in user) {
            if (field === 'avatar') {
                var url = user[field].uri;
                var parts = url.split("/");
                var lileName = parts[parts.length - 1];
                console.log("File name: " + lileName);
                form.append(field,
                    // {
                    JSON.stringify({
                        uri: user[field].uri,

                        name: user[field].fileName,
                        type: user[field].type
                    }))
                // })
            } else
                form.append(field, user[field])
        }

        // for (let key in user) {
        //     if (key === 'avatar') {
        //         form.append(key,
        //             {
        //                 uri: user[key].uri,
        //                 name: user[key].fileName,
        //                 type: user[key].type,
        //             });
        //     } else if (key !== 'confirm') {
        //         form.append(key, user[key]);
        //     }
        //     else
        //         form.append(key, user[key]);
        // }
        console.info("Thông tin usser avatar");
        console.info(user.avatar);
        console.info("Thông tin Form");
        console.info(form);

        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.info(res.data);
            navigation.navigate("Home");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    // const register = async () => {
    //     setLoading(true);
    //     let form = new FormData();
    //     for (let field in user) {
    //         if (field === 'avatar') {
    //             form.append(key, 
    //                 JSON.stringify({
    //                 uri: user[key].uri,
    //                 name: user[key].fileName,
    //                 type: user[key].type
    //             }))
    //         } else
    //             form.append(key, user[key])
    //     }
    //     try {
    //         let res = await fetch('http://10.0.2.2:8000/users/', {
    //             method: 'POST',
    //             body: form,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         let data = await res.json();
    //         console.log(data);

    //         navigation.navigate("Login");
    //     } catch (ex) {
    //         console.error(ex);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permission Denied!");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change("avatar", res.assets[0])
            }
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value }
        })
    }

    return (
        <DismissKeyboard>

            <View style={Style.containerRegis}>
                <Text style={MyStyles.subject}>ĐĂNG KÝ</Text>
                <View >

                    <TextInput value={user.first_name} onChangeText={t => change("first_name", t)} style={Style.input} placeholder="Tên..." />
                    <TextInput value={user.last_name} onChangeText={t => change("last_name", t)} style={Style.input} placeholder="Họ và tên lót..." />
                    <TextInput value={user.email} onChangeText={t => change("email", t)} style={Style.input} placeholder="Email..." />
                    <TextInput value={user.username} onChangeText={t => change("username", t)} style={Style.input} placeholder="Tên đăng nhập..." />
                    <TextInput value={user.password} onChangeText={t => change("password", t)} style={Style.input} placeholder="Mật khẩu..." />
                    <TextInput style={Style.input} placeholder="Xác nhận mật khẩu..." />

                    <TouchableOpacity style={Style.input} onPress={picker}>
                        <Text>Chọn ảnh đại diện...</Text>
                    </TouchableOpacity>
                </View>

                {user.avatar ? <Image style={Style.avatar} source={{ uri: user.avatar.uri }} /> : ""}

                {loading === true ? <ActivityIndicator /> : <>
                    <TouchableOpacity onPress={register}>
                        <Text style={Style.button}>Đăng ký</Text>
                    </TouchableOpacity>
                </>}

            </View>
        </DismissKeyboard>
    )
}

export default Register;