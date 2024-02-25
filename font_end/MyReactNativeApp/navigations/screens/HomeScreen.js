import { Text, View, StyleSheet, ScrollView, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from 'react';
import API, { endpoints } from "../../configs/API";

import Posts from "../../components/Post/Posts";
import MyStyles from "../../styles/MyStyles";

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
        <View style={[MyStyles.container]}>
            <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize:15 }}>DANH MỤC BÀI ĐĂNG THUÊ TRỌ</Text>

            <ScrollView styles={{marginTop:'10px'}}>
                {posts === null ? <ActivityIndicator /> : <>
                    {
                        posts.map((p, index) => (
                            <Posts key={index} posts={p} navigation={navigation} />
                        ))
                    }
                </>}
            </ScrollView>
        </View>
    )
}
export default HomeScreen;
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 50,
//     },
// });