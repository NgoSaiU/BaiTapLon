import { Text, View, StyleSheet } from "react-native";
import React from 'react';

const InfoUserScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Info User</Text>
        </View>
    )

}


export default InfoUserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});