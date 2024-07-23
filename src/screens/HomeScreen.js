import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ProductList from '../components/ProductList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
