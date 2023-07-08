import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions, ScrollView} from 'react-native';
import Svg, {G, Path, Defs, LinearGradient, Stop} from "react-native-svg";
import LoginButton from './button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');


export default function LoginNavigation() {
  function SvgTop(){
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={362}
        height={257}
        fill="none"
      >
        <G filter="url(#a)">
          <Path
            fill="#170D32"
            d="M0 .137c-.016-.309 362 0 362 0v237.028c0-83.123-362 99.98-362-25.847S.017.447 0 .138Z"
          />
          <Path
            fill="#130733"
            fillOpacity={0.99}
            d="M0 .137c-.016-.309 362 0 362 0v237.028c0-83.123-362 99.98-362-25.847S.017.447 0 .138Z"
          />
          <Path
            fill="url(#b)"
            fillOpacity={0.99}
            d="M0 .137c-.016-.309 362 0 362 0v237.028c0-83.123-362 99.98-362-25.847S.017.447 0 .138Z"
          />
        </G>
        <Defs>
          <LinearGradient
            id="b"
            x1={181}
            x2={181}
            y1={0}
            y2={257}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#090317" stopOpacity={0.89} />
            <Stop offset={0.354} stopColor="#200076" stopOpacity={0.25} />
            <Stop offset={0.766} stopColor="#6502C8" stopOpacity={0.25} />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const navigation = useNavigation();

  const handleUserChange = (text) => {
    setUser(text);
  }

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleToggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const registrarse = () => {
    navigation.navigate("Registrarse");
  };

  const handleErrorVacio = (message) =>{
    if(message == "vacio"){
      if( user == "")
        setErrorUsuario("Complete este campo");
      else
        setErrorUsuario("");
      if( password == "")
        setErrorPassword("Complete este campo");
      else
        setErrorPassword("");
    }
    if(message == "error"){
      setErrorMessage("Usuario o contraseña incorrecto");
      setErrorUsuario("");
      setErrorPassword("");
    }
    else
      setErrorMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.maincontainer}>
      <View style={styles.containerSvg}>
        <SvgTop/>
        <Image 
          source={require("../assets/images/logo1.png")}
          style={styles.imageLogo}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Ingresa a tu cuenta</Text>
        <TextInput 
          style={styles.inputs} 
          placeholder='user' 
          placeholderTextColor='gray'
          onChangeText={handleUserChange}
        ></TextInput>
        {errorUsuario !== '' && <Text style={{ color: 'red' }}>{errorUsuario}</Text>}
        <View style={styles.cont_pass}>
          <TextInput 
            style={styles.pass} 
            placeholder='password' 
            placeholderTextColor='gray'
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={handlePasswordChange} 
          />
          <Button title="" onPress={handleToggleSecureEntry}/>
        </View>
        {errorPassword !== '' && <Text style={{ color: 'red' }}>{errorPassword}</Text>}
        {errorMessage !== '' && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        <LoginButton user={user} password={password} handleError={handleErrorVacio}/>
        <View style={styles.registro}>
          <Text style={styles.subtitulo}> No tienes una cuenta? </Text>
          <TouchableOpacity onPress={registrarse}>
            <Text style={{color: 'blue', fontSize: 18}}> Regístrate. </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#ECECEC',
    flexGrow: 1,
  },

  container: { 
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerSvg: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  imageLogo: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    marginTop: '15%',
  },

  titulo: {
    fontSize: 65,
    fontWeight: 'bold'
  },
  
  subtitulo: {
    color: 'gray',
    fontSize: 18,
    marginBottom: 30,
  },

  inputs: {
    backgroundColor: 'white',
    width: '70%',
    height: 44,
    borderColor: 'gray',
    borderRadius: 16,
    shadowColor: 'black',
    // elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    margin: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cont_pass: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
    height: 44,
    borderColor: 'gray',
    borderRadius: 16,
    shadowColor: 'black',
    // elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    margin: 13,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pass: {
    flex: 1,
  },

  registro: {
    flexDirection: 'row',
  },
  

})
