import { StyleSheet } from "react-native";
import Colors from "../../share/colors"

export default StyleSheet.create({
    contain: {
        display: 'flex',
        flexDirection: 'row',

        marginTop: 10,
        // flex: '2',
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.WHITEBLUE,
        // gap: '10'
    },
    imgageItem: {
        width: 100,
        borderRadius: 15,
        height: 115,

    },
    title: {
        fontSize: 16,
    }, salary: {
        fontSize: 20,
        color: Colors.RED
    }, location: {
        fontSize: 14,
    }, created_date: {
        // flexDirection: "row",
        // alignItems: 'left',
        // gap: 10,
        fontSize: 16,
    }, heart: {
        // size: 14,
        color: 'red',
        marginLeft: 20,
        marginTop: 4,
    }
    // Post Details
    , main: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
    }, imageDetails: {
        width: 350,
        borderRadius: 15,
        height: 350,
    }, titleDetails: {
        fontSize: 16,
        fontWeight: 'bold',
    }, create_date_details: {
        fontSize: 20,
    }, salaryDetails: {
        fontSize: 20,
        color: Colors.RED
    }, locationDetails: {
        fontSize: 14,
    }, locationDetails: {
        fontSize: 14,
    }

})