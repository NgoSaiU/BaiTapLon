import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from 'react';
import MyContext from "../../configs/MyContext";
import Posts from "../../components/Post/Posts";
import API, { authApi, endpoints } from "../../configs/API";

const FavouriteScreen = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);
    const [post, setPost] = useState(null)

    if (user !== null) {
        useEffect(() => {
            const loadPostFav = async () => {
                try {
                    let res = await API.get(endpoints['posts-favourite'](user.id))
                    setPost(res.data.results);
                    console.info('Danh sach bai favourite')
                    console.info(res.data.results);

                } catch (ex) {
                    console.info('Loi dong nay')
                    console.error(ex);
                }
            };
            loadPostFav();
        }, []);
    }
    const swichScreen = () => {
        navigation.navigate("InfoUserName");
    }
    return (
        <View>
            {user === null ? <>
                <View>
                    <Text>Hãy đăng nhập để xem bài đăng yêu thích</Text>
                    <TouchableOpacity onPress={swichScreen}>
                        <Text>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </> : <>
                <View View style={styles.container} >
                    <Text>Favourite Screen</Text>
                    {/* <ScrollView styles={{ marginTop: '10px' }}>
                            {post === null ? <ActivityIndicator /> : <>
                            {
                                    post.map((p, index) => (
                                    // <Posts key={index} post={p} navigation={navigation} />
                                    <Text key={index}>{p.title}</Text>
                                ))
                            }
                        </>}
                    </ScrollView> */}
                    <Text>ID cua user {user.id}</Text>
                </View >
            </>
            }
        </View>
    )
}

export default FavouriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});