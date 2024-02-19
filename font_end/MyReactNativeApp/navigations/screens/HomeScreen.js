import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import API, { endpoints } from "../../configs/API";
import Post from "../../components/Post/Posts"

const HomeScreen = ({ navigation }) => {
    const [posts, setPost] = useState(null)
    useEffect(() => {
        const loadPosts = async () => {
            let url = endpoints['posts'];
            try {
                let res = await API.get(url);
                setPost(res.data);
                console.log(res.data);

            } catch (ex) {
                setPost([]);
                console.error(ex);
            }
        };
        loadPosts();
    }, []);

    // trang này sẽ sử dụng cho việc hiển thị danh sách bài đăng
    return (
        <View style={styles.container}>
            <Text>DANH MỤC BÀI ĐĂNG THUÊ TRỌ</Text>
            <ScrollView>
                {posts === null ? <ActivityIndicator/> : <>
                    {
                        posts.map(c => (
                            <View  key={c.id}>
                                <Text>{c.title}</Text>
                            </View>
                        ))
                        
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