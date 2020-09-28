import React, { useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Description, TextDescription } from './styles';

const Listcar = ({ data, onPressDelete, onPressPut }) => {

  const [margin, setmargin] = useState(new Animated.Value(0));
  const [startMargin, setStartMargin] = useState(true);
  const [startWidth, setStartWidth] = useState(new Animated.Value(0));
  const [startOpacity, setStartOpacity] = useState(new Animated.Value(0));

  const RenderButtons = () => {
    return (
      <View style={style.headerCard}>

        <TouchableOpacity onPress={onPressPut} style={[style.buttonCard, { marginLeft: 5, }]} >
          <FontAwesome name="edit" size={20} color="#59578e" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressDelete} style={[style.buttonCard, { marginLeft: 5, }]}>
          <FontAwesome name="trash" size={20} color="#59578e" />
        </TouchableOpacity>

      </View>
    );
  };

  const getOptions = () => {

    if (startMargin) {
      Animated.sequence([

        Animated.parallel([
          Animated.timing(margin,
            {
              toValue: 20,
              duration: 500,
              useNativeDriver: false,
            }
          ),
          Animated.timing(startWidth,
            {
              toValue: 20,
              duration: 500,
              useNativeDriver: false,
            }
          ),
        ]),

        Animated.timing(startOpacity,
          {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
          }
        ),
      ]).start();
      setStartMargin(!startMargin);
    } else {
      Animated.sequence([

        Animated.timing(startOpacity,
          {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }
        ),
        Animated.parallel([
          Animated.timing(startWidth,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }
          ),
          Animated.timing(margin,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }
          ),
        ]),
      ]).start();
      setStartMargin(!startMargin);
    };
  };

  const translateX = startWidth.interpolate({
    inputRange: [0, 10],
    outputRange: ['0%', '10%']
  });

  return (

    <View style={style.card}>
      <TouchableRipple onPress={() => getOptions()}>
        <View style={{ flexDirection: 'row' }}>

          <Animated.View style={{ flexDirection: 'row', width: translateX, opacity: startOpacity }}>
            <RenderButtons />
          </Animated.View>

          <Animated.View style={[style.cardContent, { marginLeft: margin }]}>

            <View>
              <Description>
                <TextDescription>{data.model} - {data.color}</TextDescription>
              </Description>

              <Description>
                <TextDescription>{data.type == 'CAR' ? 'Carro' : 'Moto'} - {data.licensePlate} </TextDescription>
              </Description>
            </View>

          </Animated.View>
        </View>
      </TouchableRipple>
    </View >
  );
}

export default Listcar;

const style = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginVertical: 10,
    padding: 5,

  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCard: {
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  }
});