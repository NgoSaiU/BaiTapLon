import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import Style from '../Post/Style';
import moment from "moment";
import defaultImage from '../../assets/Image/defaultImg.jpg'
import RenderHTML from 'react-native-render-html';
import MyContext from '../../configs/MyContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DismissKeyboard from '../DismissKeyboard/DisKeyboard';


const PostDetails = ({ route, navigation }) => {

    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const [content, setContent] = useState('');
    const [user,] = useContext(MyContext);

    useEffect(() => {
        const loadPostDetails = async () => {
            try {
                let res = await API.get(endpoints['post-details'](postId));
                setPost(res.data)
                console.info(res.data)
            } catch (ex) {
                console.error(ex);
            }
        }
        const loadComments = async () => {
            try {
                let res = await API.get(endpoints['comments'](postId));
                setComments(res.data);
            } catch (ex) {
                console.error(ex);
            }
        }

        loadPostDetails();
        loadComments();
    }, [postId]);

    const addComment = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            let res = await authApi(token).post(endpoints['add-comment'](postId), {
                'content': content
            })
            setComments(current => [res.data, ...current]);
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <DismissKeyboard>
            <ScrollView style={Style.main}>
                <Text>CHI TIẾT BÀI ĐĂNG {postId} </Text>
                {post === null ? <ActivityIndicator /> : <>
                    {post.images === '' ? <>
                        <Image source={defaultImage} style={Style.imageDetails} />
                    </> : <>
                        <Image source={{ uri: post.images[0].link }} style={Style.imageDetails} />
                    </>
                    }
                    <Text style={Style.titleDetails} >{post.title}</Text>
                    <View>
                        <Text style={Style.salaryDetails} >{post.price} VNĐ</Text>
                        <Text style={Style.create_date_details} >{moment(post.created_date).fromNow()}</Text>
                    </View>

                    {/* mét vuôn */}
                    <Text> Mét {post.acreage}</Text>
                    {/* <Text> Mét {post.post.images[0].link}</Text> */}
                    <Text> Sddt {post.phone}</Text>
                    <Text style={Style.locationDetails}>{post.address}</Text>

                    {/* mô tả */}
                    <ScrollView style={Style.description}>
                        <RenderHTML source={{ html: post.description }} />
                    </ScrollView>
                    {/* Bình luận */}
                    <ScrollView>
                        {user === null ? <>
                            <Text >Đăng nhập để bình luận</Text>
                        </> : <>
                            <View style={[Style.row, { alignItems: "center", justifyContent: "center" }]}>
                                <TextInput value={content} onChangeText={t => setContent(t)} style={Style.comment} placeholder="Nội dung bình luận" />
                                <TouchableOpacity onPress={addComment}>
                                    <Text style={Style.button}>Bình luận</Text>
                                </TouchableOpacity>
                            </View>
                        </>}

                        {comments === null ? <ActivityIndicator /> : <>
                            {comments.map(c => <View style={{ flexDirection: 'row' }} key={c.id}>
                                {/* <Image source={{ uri: c.user.image }} style={[MyStyles.m_10, Styles.thumb]} /> */}
                                <Image source={defaultImage} style={Style.imageUser} />
                                <View>
                                    <Text style={Style.ml_6}>{c.content}</Text>
                                    <Text style={Style.ml_6}>{moment(c.created_date).fromNow()}</Text>
                                </View>
                            </View>)}
                        </>}
                    </ScrollView>

                </>}

            </ScrollView>
        </DismissKeyboard>


        // <View>
        //     <Text>Chi tiết bài đăng {postId}</Text>
        // </View>
    )
}

export default PostDetails;