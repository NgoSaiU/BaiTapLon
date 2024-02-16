import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import { endpoints } from "../../configs/API";



const HomeScreen = ({ navigation }) => {

    const [posts, setpost] = useState(null)

    useEffect(() => {
        const loadPosts = async () => {
            let url = endpoints['posts'];

            try {
                let res = await API.get(url);
                setCourses(res.data.results);
                console.log(res.data);

            } catch (ex) {
                setCourses([]);
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