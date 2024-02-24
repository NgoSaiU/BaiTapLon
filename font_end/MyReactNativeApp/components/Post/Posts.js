import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


const Posts = ({posts, navigation}) => {

    const goToPostDetails = (postId) => {
        navigation.navigate("PostDetails", { "postId": postId })
    }

    return (
        <View>
            <TouchableOpacity onPress={() => goToPostDetails(posts.id)}>
                <Text>{posts.title}</Text>
                <Text>id của bài:{posts.id}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToPostDetails(posts.id)}>
                {posts.images.length > 0 && (
                    <Image source={{ uri: posts.images[0].link }} style={[{ width: 80, height: 80 }]} />
                )}
            </TouchableOpacity>
        </View>
    )
}
export default Posts;