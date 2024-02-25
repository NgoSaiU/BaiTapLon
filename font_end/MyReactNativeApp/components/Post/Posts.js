import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Style from '../Post/Style';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import moment from "moment";


const Posts = ({ posts, navigation }) => {

    const goToPostDetails = (postId) => {
        navigation.navigate("PostDetails", { "postId": postId })
    }

    return (
        <View style={Style.contain}>
            <View>
                <TouchableOpacity onPress={() => goToPostDetails(posts.id)}>
                    {posts.images.length > 0 && (
                        <Image source={{ uri: posts.images[0].link }} style={Style.imgageItem} />
                    )}
                    {/* <Text>LEFT</Text> */}
                </TouchableOpacity>
            </View>

            <View style={{marginLeft:15}}>
                <TouchableOpacity onPress={() => goToPostDetails(posts.id)}>
                    <Text style={Style.title}>{posts.title}</Text>
                    <Text style={Style.salary}>{posts.price}</Text>
                    <Text style={Style.location}>{posts.address}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }} >
                        <Text style={Style.created_date}>{moment(posts.created_date).fromNow()}</Text>
                        <Octicons name="heart" size={20} style={[Style.heart]} />
                        {/* <Entypo name="heart" size={20} style={[Style.heart]} /> */}
                    </View>
                    {/* <Text> mét vuông {posts.created_date}</Text> */}
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Posts;