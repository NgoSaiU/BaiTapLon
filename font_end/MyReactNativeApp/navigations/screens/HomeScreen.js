import { Text, View, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import API, { endpoints } from "../../configs/API";

import Posts from "../../components/Post/Posts";

const HomeScreen = ({ navigation }) => {
    const [posts, setPost] = useState(null)

    useEffect(() => {
        const loadPosts = async () => {
            // const url = "https://ngosaiustudent.pythonanywhere.com/posts/"

            let url = endpoints['posts'];
            try {
                let res = await API.get(url);
                setPost(res.data.results);
                console.info(res.data.results);

            } catch (ex) {
                setPost([]);
                console.error(ex);
            }
        };
        loadPosts();
    }, []);

    return (
        <View style={styles.container}>
            <Text>DANH MỤC BÀI ĐĂNG THUÊ TRỌ</Text>
            <ScrollView>
                {posts === null ? <ActivityIndicator /> : <>
                    {
                        posts.map(p => {
                            return (
                                <Posts posts={p} navigation={navigation} />
                                )
                        })
                    }
                </>}
            </ScrollView>
        </View>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
});