import React, {useEffect, useState} from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, Image, NativeEventEmitter, NativeModules } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
// import BleManager from 'react-native-ble-manager';
// import { request, PERMISSIONS } from 'react-native-permissions';
import BluetoothModal from './Modal';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default function HomeScreen() {
  const route = useRoute();
  const user = route.params;
  console.log(user);
  const [blueList, setBlueList] = useState();
  const [spData, setSpData] = useState("0");
  const [watts, setWatts] = useState(0);
  // const [addressB, setAddressB] = useState("");
  // 
  //Bluetooth Permmisions

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  }

  const handleDataReceived = (data) => {
    // Procesa los datos recibidos del dispositivo
    console.log("a",data,"a");
    if(data !== " " || data != undefined){
      let d = data*5;
      setSpData(data);
      setWatts(d.toFixed(1));
    }
      
    // Aquí puedes realizar las acciones necesarias con los datos recibidos
  };

  //Bluetooth Connection
  useEffect(() => {
    requestLocationPermission();
    const init = async () => {
      const enable = await BluetoothSerial.requestEnable();
      console.log(enable);
      BluetoothSerial.discoverUnpairedDevices()
        .then(devices => {
          console.log('Dispositivos no vinculados:', devices);
          for (let index = 0; index < devices.length; index++) {
            if(devices[index].name != null)
              setBlueList([...blueList, devices[index]]);
          }
        })
        .catch(error => console.error('Error al obtener dispositivos no vinculados:', error));
      const lista = await BluetoothSerial.list();
      console.log(lista);
      setBlueList(lista);
    }

    init();
    BluetoothSerial.readEvery(
      (data, intervalId) => {
        handleDataReceived(data);
        console.log(data);

        if (this.imBoredNow && intervalId) {
          clearInterval(intervalId);
        }
      },
      3000,
      "\r\n"
    )
    // BluetoothSerial.on('data', handleDataReceived);

    return() => {
      const remove = async () => {
        await BluetoothSerial.stopScanning();
        console.log("Termino scanner");
      }

      remove();
      // BluetoothSerial.removeListener('read', handleDataReceived);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.barra}>
        <Image
          source={require('./../assets/images/logo1.png')}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Home</Text>
      </View>
      <View style={styles.subtituloCont}>
        <Text style={styles.subtitulo}>Hola, {user.nombre}!</Text>
      </View>
      <View style={styles.subtituloCont}>
        <Text style={styles.subtitulo1}>Mira aquí tu energía</Text>
      </View>
      <View style={styles.informacion}>
        <View style={styles.imagenContainer} >
          <Image
            source={require('./../assets/images/bateria3.png')}
            style={styles.imagen}
          />
        </View>
        <View style={styles.voltaje}>
          <Text style={styles.voltajeInfo}>{watts} mW</Text>
          <Text style={styles.voltajeInfo}>{spData} mA</Text>
        </View>
      </View>
      <View style={styles.modal}>
        <BluetoothModal lista={blueList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC'
  },

  barra: {
    // marginTop: 50,
    flexDirection: 'row',
    marginBottom:20,
    height: '8%',
    width: '100%',
    padding:6,
    paddingLeft:10,
    backgroundColor: '#170D32',
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    shadowColor: 'black',
    elevation: 3,
    shadowRadius: 30,
    shadowOpacity: 0.8,
    shadowOffset: {width: 0, height: 4},
    zIndex:2,

  },

  logo: {
    width:43,
    height: 43,
  },

  titulo: {
    paddingTop:5,
    paddingLeft: '32%',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems:'center',
    color: 'white'
  },
  
  subtituloCont:{
    paddingLeft: 10,
  },

  // subtituloCont1: {
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //   width: "87%",
  //   height: "10%",
  //   alignSelf: "center",
  //   justifyContent: "center",
  //   borderRadius: 14,
  //   shadowColor: 'black',
  //   elevation: 5,
  //   shadowRadius: 10,
  //   shadowOpacity: 0.5,
  // },

  subtitulo: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "flex-start",
    color: "#F9BC02"
  },

  subtitulo1: {
    fontWeight: "400",
    fontSize: 20,
    alignSelf: "flex-start",
    color: "#F9BC02"
  },
  
  informacion: {
    height: "60%",
    alignItems: "center"
  },

  imagenContainer: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#170D32',
    paddingTop: "6%",
    paddingBottom: "8%",
    marginTop: "9%",
    borderRadius: 15,
    height: "75%",
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    elevation:30,
    shadowColor: '#000000',
  },

  voltaje: {
    position: 'absolute',
    top: "45%",
    left: "35%",
    right: 0,
    bottom: 0,
    height: "20%",
    width: "30%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },

  voltajeInfo:{
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "#F9BC02",
    alignItems: "center",
  },

  imagen: {
    width: "80%",
    height: 250

  },

  modal: {
    flex:1,
    justifyContent: 'flex-end',
  }
});
