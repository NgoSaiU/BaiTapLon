import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import MainContainer from './navigations/MainContainer'
import MyContext from './configs/MyContext';
import MyUserReducer from './reducers/MyUserReducer';



const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <MainContainer />
    </MyContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
