import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default ListItem = ({ item, connectBlue }) => {
  const handlePress = (value) => {
    connectBlue(value);
  }
  return (
    <View style={styles.item}>
      <View style={styles.text}>
        <Text>{item.name}</Text>
      </View>
      <View style={styles.boton}>
        <Button title="Connect" onPress={() => handlePress(item)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  boton: {
    flex: 1,
    alignItems: "flex-end"
  },
});
