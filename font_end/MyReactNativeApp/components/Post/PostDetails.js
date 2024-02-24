import React from 'react';
import { Text, View } from 'react-native';

const PostDetails = ({route, navigation}) => {

    const { postId } = route.params;

    return (
        <View>
            <Text>Chi tiết bài đăng {postId}</Text>
        </View>
    )
}

export default PostDetails;