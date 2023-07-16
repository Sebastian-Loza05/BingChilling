import React, {useState} from 'react';
import { StyleSheet, FlatList, Modal, Button, Text, View, Image } from 'react-native';
import ListItem from "../containers/list";
import BluetoothSerial from 'react-native-bluetooth-serial-next';

export default function BluetoothModal({lista}){
  const [modalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const connect = (item) => {
    try {
      BluetoothSerial.connect(item.address);
      console.log('Conectado al dispositivo:', item.name);
      toggleModal();
      BluetoothSerial.readFromDevice();
    } catch (error) {
      console.error('Error al conectar al dispositivo:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Contenido de la ventana emergente</Text>
            <FlatList
              data={lista}
              renderItem={({ item }) => <ListItem item={item} connectBlue={connect}/>}
              keyExtractor={(item) => item.address}
            />
            <Button title="Cerrar ventana" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
      <Button title="Abrir ventana" onPress={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
