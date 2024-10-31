// register.js
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

import { useState} from 'react';

export default function App({navigation}) {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://192.168.1.47:3000/api/register', {
          name: user,
          pass: pass,
          avatar: 'https://imgur.com/2SDsjlL.png'
        });
        Alert.alert("Đăng ký thành công!", response.data.message);
        navigation.goBack();
      } catch (error) {
        if (error.response) {
          Alert.alert("Lỗi", error.response.data.error || "Đăng ký thất bại");
        } else {
          Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");
        }
      }
    };    
    
  return (
    <View style={styles.container}>
        <View style={styles.logo}>
            <Image style={{height: 100, width: 100}} source={require('../assets/logoicon.png')}/>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>Hello</Text>
        </View>
        <View style={styles.viewInput}>
            <View style={styles.input}>
                <Icon name='user' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'white'}} 
                placeholder='user name' placeholderTextColor={'white'} value={user} onChangeText={setUser}/>
            </View>
            <View style={styles.input}>
                <Icon name='lock' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10, color: 'white'}} 
                placeholder='password' placeholderTextColor={'white'} value={pass} onChangeText={setPass}/>
            </View>

            <TouchableOpacity style={styles.Touch} onPress={handleRegister}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Register</Text>
            </TouchableOpacity>

            <View style={styles.hr}/>

            <TouchableOpacity style={{alignItems: 'center'}} onPress={()=> navigation.goBack()}>
                <Text style={{fontSize: 13, color: 'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5958b2',
  }, logo: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  }, viewInput: {
    paddingVertical: 20,
    paddingHorizontal: 10
  }, input: {
    borderColor: 'white',
    borderWidth: .3,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    marginVertical: 10,
    color: 'white'
  }, Touch : {
    padding: 20,
    backgroundColor: '#474693',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 15
  }, hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});
