import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/actions';

const ProductModal = ({visible, product, onClose}) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          {product && (
            <>
              <Image source={{uri: product.image}} style={styles.image} />
              <View style={styles.descriptionContainer}>
                <Text>Description:</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
                 <Image source={require('../images/shopping-cart.png')} style={styles.cartIcon} />
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button ,{backgroundColor: 'gray'}]} onPress={onClose}>
                  <Text style={[styles.buttonText , {color: '#000'}]}>Close</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modal: {
    width: '80%',
    maxHeight: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  descriptionContainer: {
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  cartIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: '#fff',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default ProductModal;
