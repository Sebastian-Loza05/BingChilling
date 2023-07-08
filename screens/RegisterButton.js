import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createUser} from '../api';

export default function RegisterButton({usuario, correo, nombre, password, password2, handleError, handleErrorEmail}){
  const navigation = useNavigation();
  const handleSubmit = async () => {
    if(usuario == '' || correo == '' || nombre == '' || password == '' || password2 =='')
      handleError("Vacio");
    else{
      if(handleErrorEmail()){
        const res = await createUser({usuario, password, correo, nombre});
        if (!res.success){
          if(res.message == "Usuario"){
            handleError("UsuarioExistente");
          }
        }
        else {
          handleError("");
          navigation.navigate('Home', res.user);   
        }
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
          <Text style={styles.text}> Registrate </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '8%',
    width: '55%',
    marginBottom: 30,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
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
