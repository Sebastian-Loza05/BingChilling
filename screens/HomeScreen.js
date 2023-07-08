import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { request, PERMISSIONS } from 'react-native-permissions';


export default function HomeScreen() {
  // const route = useRoute();
  // const user = route.params;
  
  //Bluetooth Permmisions
  const requestBluetoothPermission = async () => {
    try {
      const granted1 = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      const granted2 = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      const granted3 = await request(PERMISSIONS.ANDROID.BLUETOOTH_ADMIN);
      const granted4 = await request(PERMISSIONS.ANDROID.BLUETOOTH);
      if (granted1 === 'granted' && granted2 === 'granted' && granted3 === 'granted' && granted4 === 'granted') {
        console.log('Permisos de Bluetooth concedidos');
        // Aquí puedes iniciar la funcionalidad de Bluetooth
      } else {
        console.log('Permisos de Bluetooth denegados');
        // Aquí puedes manejar la situación cuando se deniegan los permisos
      }
    } catch (error) {
      console.log('Error al solicitar permisos de Bluetooth:', error);
    }
  };


  //Bluetooth Connection
  useEffect(() => {
    
    requestBluetoothPermission();

    const init = async () => {
      const enable = await BluetoothSerial.requestEnable();
      const lista = await BluetoothSerial.list();
      console.log(lista);    
    }

    init();

    return() => {
      const remove = async () => {
        await BluetoothSerial.stopScanning();
        console.log("Termino scanner");
      }

      remove();
    }

  }, []);
  // const manager = new BleManager();

  // BleManager.start({ showAlert: false }); // Inicia el módulo BLE Manager
  //
  // BleManager.scan([], 5, true)
  //   .then(results => {
  //     console.log('Escaneo completo:', results);
  //   })
  //   .catch(error => {
  //     console.log('Error en el escaneo:', error);
  //   });
  // const handleScan = () => {
  //   BleManager.startDeviceScan(null, null, (error, device) => {
  //     if (error) {
  //       console.log('Error scanning devices:', error);
  //       return;
  //     }
  //
  //     console.log('Scanned device:', device.name, device.id);
  //   });
  // };
  //
  // const handleConnect = (deviceId) => {
  //   BleManager.stopDeviceScan();
  //   BleManager.connectToDevice(deviceId)
  //     .then((device) => {
  //       console.log('Connected to device:', device.name, device.id);
  //     })
  //     .catch((error) => {
  //       console.log('Error connecting to device:', error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.barra}>
        <Image
          source={require('./../assets/images/logo1.png')}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Home</Text>
      </View>
      <View>
        <Text>App</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowRadius: 6,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},

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
  }
});
