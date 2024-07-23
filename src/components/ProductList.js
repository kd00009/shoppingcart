import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import ProductModal from './ProductModal';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to fetch products. Please try again later.',
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = product => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = product => {
    dispatch(addToCart(product));
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  const renderItem = ({item}) => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    return (
      <TouchableOpacity
        onPress={() => handleProductPress(item)}
        style={styles.item}>
        <Image
          source={{uri: item.image}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.price}>Rs. {item.price.toFixed(2)}</Text>
            {quantity > 0 && (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => dispatch(decrementQuantity(item.id))}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(incrementQuantity(item.id))}
                  style={styles.quantityButton}>
                  <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ⭐ {item.rating.rate} ({item.rating.count} reviews)
            </Text>
          </View>
          <Text style={styles.category}>Category: {item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#25e6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      {selectedProduct && (
        <ProductModal
          visible={!!selectedProduct}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  category: {
    fontSize: 16,
    color: 'gray',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#ff9800',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },

  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default ProductList;
