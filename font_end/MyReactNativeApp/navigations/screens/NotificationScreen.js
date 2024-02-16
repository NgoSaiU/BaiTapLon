import { Text, View, StyleSheet } from "react-native";
import React from 'react';

const NotificationScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Notification Screen</Text>
        </View>
    )

}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});