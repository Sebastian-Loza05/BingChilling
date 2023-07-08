import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Login } from '../api';
import { useNavigation } from '@react-navigation/native';

export default function LoginButton({user, password, handleError}){
  const navigation = useNavigation();
  const handleSubmit = async () => {
    if(user == "" || password == "")
      handleError("vacio");
    else{
      const res = await Login({user, password});
      if (res.success){
        handleError("");
        navigation.navigate('Home', res.user);   
      }
      else{
        handleError("error"); 
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSubmit}>
        <LinearGradient
          colors={['#090317', '#200076', '#6502C8']}
          style={styles.boton}
        >
          <Text style={styles.text}> Login </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '35%',
    marginBottom: 30,
    borderRadius: 20,
    marginTop: 30,
  },

  boton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  text: {
    fontSize: 20,
    color: '#C69802',
    margin: 15,
    position: 'absolute',
    fontWeight: 'bold',
  },
});


