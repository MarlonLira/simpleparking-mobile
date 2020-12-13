import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import BottomSheet from '../../components/BottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { Creators as ParkingProductAction } from '../../store/ducks/parkingProduct';

const ParkingProduct = ({ idParking, visible, handleCloseButton }) => {
  console.log(idParking);

  const dispatch = useDispatch();
  const { parkingProducts } = useSelector(state => state);

  useEffect(() => {
    if (typeof idParking != undefined) {
      dispatch(ParkingProductAction.productRequest(idParking));
    }
  }, [idParking]);

  const RenderInner = () => (
    <View >
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}> Adicione um serviço. </Text>
        <Text style={styles.panelSubtitle}> Seviços disponíveis: </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {parkingProducts.products == [] ? null : parkingProducts.products.map((product, index) => {
          return (
            <TouchableOpacity key={index} onPress={handleCloseButton} style={styles.button}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.valueProduct}>{`R$ ${product.value.toFixed(2)}`}</Text>
            </TouchableOpacity>
          )
        })
        }
      </ScrollView>

    </View>
  );

  return (
    <BottomSheet
      body={<RenderInner />}
      show={visible}
      handleCloseButton={handleCloseButton}
    />
  );
}

export default ParkingProduct;

const styles = StyleSheet.create({
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#59578e',
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    width: 200
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  },
  valueProduct: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#59578e',
    marginTop: 10,
  }
});