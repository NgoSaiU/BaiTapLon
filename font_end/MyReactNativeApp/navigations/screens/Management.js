import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import MyStyles from "../../styles/MyStyles"

const Management = () => {
    

    return (
        <ScrollView style={MyStyles.container}>
            <View>
                <Text>Nơi hiển thị danh sách bài đăng của mình</Text>
            </View>
            <View>
                <Text>Quản lý bài đăng</Text>
                <TouchableOpacity >
                    <Text style={MyStyles.buttonAddPost}>Thêm bài đăng</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

    )

}
export default Management