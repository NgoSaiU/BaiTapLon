import { useContext } from "react";
import MyContext from "../../configs/MyContext";
import { Button } from "react-native";

const Logout = () => {
    const [user, dispatch] = useContext(MyContext);

    const logout = () => {
        dispatch({
            "type": "logout"
        })
    }

    if (user === null)
        return <Text>WELCOME</Text>

    return <Button title="Đăng xuất" onPress={logout} />
}

export default Logout;