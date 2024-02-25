import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import API, { endpoints } from '../../configs/API';
import Style from '../Post/Style';
import moment from "moment";
import defaultImage from '../../assets/Image/defaultImg.jpg'

const PostDetails = ({ route, navigation }) => {

    const { postId } = route.params;
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);

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

        // const loadComments = async () => {
        //     try {
        //         let res = await API.get(endpoints['comments'](lessonId));
        //         setComments(res.data);
        //     } catch (ex) {
        //         console.error(ex);
        //     }
        // }

        loadPostDetails();
        // loadComments();
    }, [postId]);


    return (
        <ScrollView style={Style.main}>
            <Text>CHI TIẾT BÀI ĐĂNG {postId} </Text>
            {post === null ? <ActivityIndicator /> : <>
                {/* {post.images === '' ? <>
                    <Image source={defaultImage} style={Style.imageDetails} />
                </> : <>
                    <Image source={{ uri: post.images[0].link }} style={Style.imageDetails} />
                </>
                } */}
                
                {/* {console.info(post.images[0].link)}
                <Image source={defaultImage} style={Style.imageDetails} /> */}

                {/* <Image style={Style.imageDetails}
                    onError={(error) => {
                        setError(true);
                    }}
                    source={
                        error
                            ? defaultImage
                            : { uri: post.images[0].link }
                    }

                /> */}
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
            </>}
        </ScrollView>
        // <View>
        //     <Text>Chi tiết bài đăng {postId}</Text>
        // </View>
    )
}

export default PostDetails;