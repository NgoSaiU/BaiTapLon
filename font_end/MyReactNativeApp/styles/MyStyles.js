import { StyleSheet } from "react-native";
import colors from "../share/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        marginTop: 50,
        
    }, row: {
        flexDirection: "row"
    }, subject: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue"
    }, m_10: {
        margin: 6
    }, title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "green"
    },buttonAddPost:{
        backgroundColor: colors.WHITEBLUE,
        fontSize: 20,
        justifyContent: "center",
        alignItems: "center",
    }
});