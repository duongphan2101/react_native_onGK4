import { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

export default function App({navigation, route}) {
  const user  = route.params.userData;
  const [name, setName]  = useState(user.name);
  const [pass, setPass]  = useState(user.pass);
  const [avatar, setAvatar]  = useState(user.avatar);
  return (
    <View style={styles.container}>
        <View style={styles.head}>
          <Image style = {{width: 80, height: 80, borderRadius: 90}} 
          source={{uri : user.avatar}}/>
          <Text style={{fontSize: 24, marginLeft: 15, fontWeight: 'bold'}}>{user.name}</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Text style={{fontSize: 16}}>User</Text>
            <TextInput value={name} onChangeText={setName} style={{flex: 1, marginLeft: 10}}/>
          </View>

          <View style={styles.inputBox}>
            <Text style={{fontSize: 16}}>Pass</Text>
            <TextInput value={pass} onChangeText={setPass} style={{flex: 1, marginLeft: 10}}/>
          </View>

          <View style={styles.inputBox}>
            <Text style={{fontSize: 16}}>Avatar</Text>
            <TextInput value={avatar} onChangeText={setPass} style={{flex: 1, marginLeft: 10}}/>
          </View>

          <TouchableOpacity  style={styles.touchSave}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>

          <TouchableOpacity  style={[styles.touchSave,{backgroundColor: '#dc3545'}]} onPress={()=> navigation.navigate('Login')}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Sign Out</Text>
          </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }, head : {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10
    }, form : {
      marginTop: 20,
      padding: 10,
      borderTopWidth: .3,
      borderTopColor: 'grey',
      flex: 1
    }, inputBox : {
      borderWidth: .3,
      borderColor : 'grey',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 10, 
      marginVertical: 10
    },
    touchSave : {
      padding: 10,
      borderRadius: 10, 
      marginVertical: 10,
      alignItems:'center',
      backgroundColor: '#28a745'
    }
});
