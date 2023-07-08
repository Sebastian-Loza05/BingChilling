import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import Titulo_registro from "./TituloRegistro";
import { TextInput } from 'react-native-gesture-handler';
import RegisterButton from './RegisterButton';

export default function RegistroScreen(){
  function SvgTop(){
    return(
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={360}
        height={344}
        fill="none"
      >
        <Path
          fill="url(#a)"
          fillOpacity={0.99}
          d="M360-4.954c.016-.516-359.732 0-359.732 0V324c0 96 359.725-200 359.732-70 .007 130-.017-258.437 0-258.954Z"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={180.272}
            x2={180.272}
            y1={-1.815}
            y2={427.39}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#070215" />
            <Stop offset={0.281} stopColor="#1A0945" />
            <Stop offset={0.545} stopColor="#230E60" />
            <Stop offset={0.775} stopColor="#280E71" />
            <Stop offset={1} stopColor="#280D92" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
  function SvgBottom(){
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={360}
        height={366}
        fill="none"
      >
        <Path
          fill="url(#a)"
          fillOpacity={0.99}
          d="M.001 365.759c-.016.542 359.999 0 359.999 0V20.497C360-80.263.009 230.412.001 93.967c-.007-136.444.017 271.25 0 271.792Z"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={179.862}
            x2={179.862}
            y1={362.465}
            y2={-88.018}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#070215" />
            <Stop offset={0.281} stopColor="#1A0945" />
            <Stop offset={0.545} stopColor="#230E60" />
            <Stop offset={0.775} stopColor="#280E71" />
            <Stop offset={1} stopColor="#280D92" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [errorUsuario, setErrorUsuario] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorPassword2, setErrorPassword2] = useState('');

  const handleUsuarioChange = (text) => {
    setUsuario(text);
  };

  const handleCorreoChange = (text) => {
    setCorreo(text);
    setErrorCorreo("");
  };

  const handleValidationEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      setErrorCorreo('Correo electrónico inválido');
      return false;
    }
    else {
      setErrorCorreo('');
      return true;
    }
  }

  const handleNombreChange = (text) => {
    setNombre(text);
  };

  const handlePasswordChange1 = (text) => {
    setPassword(text);
  };

  const handleToggleSecureEntry1 = () => {
    setSecureTextEntry1(!secureTextEntry1);
  };

  const handlePasswordChange2 = (text) => {
    setPassword2(text);
    if (text != password){
      setErrorPassword2('No coinciden');
    }
    else if(text == " " || text == password){
      setErrorPassword2('');
    }
  };

  const handleToggleSecureEntry2 = () => {
    setSecureTextEntry2(!secureTextEntry2);
  };


  const handleError = (message) => {
    if(message == "UsuarioExistente"){
      setErrorUsuario('Este usuario ya existe');
    }
    else if(message == "Vacio"){
      if(usuario == '')
        setErrorUsuario('Complete este campo');
      else
        setErrorUsuario('');

      if(correo == '')
        setErrorCorreo('Complete este campo');
      else
        setErrorCorreo('');

      if(nombre == '')
        setErrorNombre('Complete este campo');
      else
        setErrorNombre('');

      if(password == '')
        setErrorPassword('Complete este campo');
      else
        setErrorPassword('');

      if(password2 == '')
        setErrorPassword2('Complete este campo');
      else
        setErrorPassword2('');
    }
    else {
      setErrorUsuario('');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.svg}>
        <SvgTop/>
      </View>
      <Text style={styles.titulo}>Regístrate</Text>
      <View style={styles.modulo}>
        <View style={styles.logo_container}>
          <Titulo_registro />
        </View>
        <View style={styles.registro}>
          <Text style={styles.subtitulos}>Usuario: </Text>
          <TextInput 
            style={styles.inputs}
            onChangeText={handleUsuarioChange}
          > </TextInput>
          {errorUsuario !== '' && <Text style={{ color: 'red' }}>{errorUsuario}</Text>}
          <Text style={styles.subtitulos}>Correo: </Text>
          <TextInput 
            style={styles.inputs}
            onChangeText={handleCorreoChange}
          > </TextInput>
          {errorCorreo !== '' && <Text style={{ color: 'red' }}>{errorCorreo}</Text>}
          <Text style={styles.subtitulos}>Nombre: </Text>
          <TextInput 
            style={styles.inputs}
            onChangeText={handleNombreChange}
          > </TextInput>
          {errorNombre !== '' && <Text style={{ color: 'red' }}>{errorNombre}</Text>}
          <Text style={styles.subtitulos}>Contraseña: </Text>
          <View style={styles.cont_pass}>
            <TextInput 
              style={styles.pass} 
              secureTextEntry={secureTextEntry1}
              value={password}
              onChangeText={handlePasswordChange1} 
            />
            <Button title="" onPress={handleToggleSecureEntry1}/>
          </View>
          {errorPassword !== '' && <Text style={{ color: 'red' }}>{errorPassword}</Text>}
          <Text style={styles.subtitulos}>Contraseña: </Text>
          <View style={styles.cont_pass}>
            <TextInput 
              style={styles.pass} 
              secureTextEntry={secureTextEntry2}
              value={password2}
              onChangeText={handlePasswordChange2} 
            />
            <Button title="" onPress={handleToggleSecureEntry2}/>
          </View>
          {errorPassword2 !== '' && <Text style={{ color: 'red' }}>{errorPassword2}</Text>}
          <Text style={styles.subtitulos}>Dispositivo: </Text>
          <TextInput style={styles.inputs}> </TextInput>
          <RegisterButton usuario={usuario} correo={correo} nombre={nombre} password={password} password2={password2} handleError={handleError} handleErrorEmail={handleValidationEmail}/>
        </View>
      </View>
      <View style={styles.svg}>
        <SvgBottom/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    // height: '100%',
  },

  titulo: {
    fontSize:50,
    fontWeight: 'bold',
    alignSelf:'center',
    marginTop: '7%',
    color: '#F9BC02',
  },

  modulo:{
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: "#ECECEC",
    position: 'absolute',
    // height: '70%',
    width: '79%',
    bottom: 170,
    alignSelf: 'center',
    borderRadius: 30,
    shadowColor: 'black',
    elevation: 100,
    shadowRadius: 30,
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 4},
    zIndex:2,
  },

  logo_container:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '11%',
    marginTop: 10,
  },

  registro: {
    // flexGrow: 1,
    marginLeft: 20,
    marginBottom: 15,
    // height: '100%',
  },
  
  subtitulos: {
    fontWeight: 'bold',
    color: 'gray',
  },

  inputs: {
    backgroundColor: 'white',
    width: '80%',
    height: '7%',
    borderColor: 'gray',
    borderRadius: 16,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    marginBottom: 9,
    marginTop: 3,
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  cont_pass: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    height: '7%',
    borderColor: 'gray',
    borderRadius: 16,
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    marginBottom: 9,
    marginTop: 3,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },

  pass: {
    flex: 1,
  },

  svg: {
    justifyContent: 'flex-end',
    position: 'relative',
  },
})
