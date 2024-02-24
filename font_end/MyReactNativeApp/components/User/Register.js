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

        for (let key in user) {
            if (key === 'avatar') {
                form.append(key,
                    {
                        uri: user[key].uri,
                        name: user[key].fileName,
                        type: user[key].type,
                    });
            } else if (key !== 'confirm') {
                form.append(key, user[key]);
            }
            else
                form.append(key, user[key]);

        }


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
            // navigation.navigate("Login");
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

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

            <View style={MyStyles.container}>
                <Text style={MyStyles.subject}>ĐĂNG KÝ</Text>

                <TextInput value={user.first_name} onChangeText={t => change("first_name", t)} style={Style.input} placeholder="Tên..." />
                <TextInput value={user.last_name} onChangeText={t => change("last_name", t)} style={Style.input} placeholder="Họ và tên lót..." />
                <TextInput value={user.email} onChangeText={t => change("email", t)} style={Style.input} placeholder="Email..." />
                <TextInput value={user.username} onChangeText={t => change("username", t)} style={Style.input} placeholder="Tên đăng nhập..." />
                <TextInput value={user.password} onChangeText={t => change("password", t)} style={Style.input} placeholder="Mật khẩu..." />
                <TextInput style={Style.input} placeholder="Xác nhận mật khẩu..." />

                <TouchableOpacity style={Style.input} onPress={picker}>
                    <Text>Chọn ảnh đại diện...</Text>
                </TouchableOpacity>

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








//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [avatar, setAvatar] = useState('');
//     const [first_name, setFirstName] = useState('');
//     const [last_name, setLastName] = useState('');

//     const handleRegister = () => {
//         const formData = new FormData();
//         formData.append('first_name', first_name);
//         formData.append('last_name', last_name);
//         formData.append('username', username);
//         formData.append('password', password);
//         formData.append('email', email);
//         formData.append('avatar', avatar);

//         axios.post('http://10.0.2.2:8000/user/', formData)
//             .then(response => {
//                 console.log('Đăng ký thành công!');
//                 console.info(response)
//                 // Xử lý chuyển hướng sau khi đăng ký thành công
//             })
//             .catch(error => {
//                 console.log('Đăng ký thất bại!');
//                 console.error(error);
//                 // Xử lý lỗi đăng ký
//             });
//     };

//     const handlePickAvatar = async () => {
//         // ImagePicker.launchImageLibrary({}, (response) => {
//         //     if (response.uri) {
//         //         setAvatar(response.uri);
//         //     }
//         // });

//         let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//         if (status !== 'granted') {
//             alert("Permission Denied!");
//         } else {
//             let res = await ImagePicker.launchImageLibraryAsync();
//             if (!res.canceled) {
//                 change("avatar", res.assets[0])
//             }
//         }
//     };
//     const change = (field, value) => {
//         // setUser(current => {
//         //     return { ...current, [field]: value }
//         // })

//         setAvatar(current => {
//             return { ...current, [field]: value }
//         })
//     }

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 onChangeText={setFirstName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 onChangeText={setLastName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Tên đăng nhập"
//                 onChangeText={setUsername}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Mật khẩu"
//                 onChangeText={setPassword}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 onChangeText={setEmail}
//             />
//             <Button title="Chọn ảnh đại diện" onPress={handlePickAvatar} />
//             {/* {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />} */}
//             {avatar ? <Image style={styles.avatar} source={{ uri: avatar.uri }} /> : ""}

//             <Button title="Đăng ký" onPress={handleRegister} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     input: {
//         width: 300,
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 10,
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         marginBottom: 10,
//     },
// })

export default Register;