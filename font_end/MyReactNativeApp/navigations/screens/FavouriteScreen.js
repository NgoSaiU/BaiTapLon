import { Text, View, StyleSheet } from "react-native";
import React from 'react';

const FavouriteScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>Favourite Screen</Text>
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