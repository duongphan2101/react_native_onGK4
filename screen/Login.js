import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/EvilIcons';

import { useState, useEffect } from 'react';
export default function App({navigation}) {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
        <View style={styles.logo}>
            <Image style={{height: 100, width: 100}} source={require('../assets/logoicon.png')}/>
            <Text style={{color: 'white', fontSize: 32, fontWeight: 'bold'}}>Wellcome Back!</Text>
        </View>
        <View style={styles.viewInput}>
            <View style={styles.input}>
                <Icon name='user' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10}} placeholder='user name'
                 placeholderTextColor={'white'} underlineColorAndroid="transparent"/>
            </View>
            <View style={styles.input}>
                <Icon name='lock' size={30} color={'white'}/>
                <TextInput style={{marginLeft: 10, flex: 1, paddingHorizontal: 10}} placeholder='password' placeholderTextColor={'white'}/>
            </View>

            <TouchableOpacity style={styles.Touch} onPress={handleLogin}>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white'}}>Login</Text>
            </TouchableOpacity>

            <View style={styles.hr}/>

            <TouchableOpacity style={{alignItems: 'center'}}>
                <Text style={{fontSize: 13, color: 'white'}}>Register</Text>
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
    marginVertical: 10
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
