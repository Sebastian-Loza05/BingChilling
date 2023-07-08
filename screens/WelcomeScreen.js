import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity onPress={handlePress}
      style={styles.container}>
      < StatusBar
        barStyle="auto"
      />
      <LinearGradient 
        colors={['#090417', '#090416', '#0B051D', '#0C061E', '#0F0727', '#0C061E', '#0B051D', '#090416', '#090417']}
        style={styles.principal}
      >
        <Image
          source={require('./../assets/images/logo-welcome.png')}
          style={styles.logo}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#0F0727'
    
  },
  principal: {
    flex: 1
  },
  logo: {
    marginTop: '50%',
    height: '40%',
    width: '100%'
  }

});
