import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Shopping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#23e5db',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 10,
  },
  cartText: {
    fontSize: 16,
  },
});

export default Header;
