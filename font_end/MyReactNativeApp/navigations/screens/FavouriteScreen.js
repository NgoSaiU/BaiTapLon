import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React from 'react';

const FavouriteScreen = ({ navigation }) => {
    const swichScreen = () => {
        navigation.navigate("notificationHome");
    }

    return (
        <View style={styles.container}>
            <Text>Favourite Screen</Text>
            <TouchableOpacity onPress={swichScreen}>
                <Text>Tesst navigation</Text>
            </TouchableOpacity>
        </View>
    )

}

export default FavouriteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});