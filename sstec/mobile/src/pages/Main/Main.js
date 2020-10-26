import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  StatusBar,
  Animated,
  Image,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import MapView, { Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { Creators as MapActions } from '../../store/ducks/map';
import Icon from 'react-native-vector-icons/Ionicons';

import Search from '../../components/Search';

const GOOGLE_MAPS_APIKEY = "AIzaSyA8loQb30JgUK1WRk6Pb5aWwEkOyLbNE4Y";
const backgroundColor = '#007256';
const { height, width } = Dimensions.get('window');
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


export default function Main() {

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState({ latitude: -8.028396, longitude: -34.907355 });
  const [parkings, setParkings] = useState([]);
  const [coordinate, setCoordinate] = useState([]);
  const [scroll, setScroll] = useState(true);

  const dispatch = useDispatch();
  const { map } = useSelector(state => state);
  const navigation = useNavigation();
  const _map = React.useRef(null);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setScroll(false);
  };

  const _keyboardDidHide = () => {
    setScroll(true);
  };

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= parkings.length) {
        index = parkings.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex != index) {
          mapIndex = index;
          const latitude = coordinate[index].latitude;
          const longitude = coordinate[index].longitude;
          const region = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
          _map.current.animateToRegion(
            {
              ...region,
              latitudeDelta: 0.0043,
              longitudeDelta: 0.0034,
            },
            350
          );
        }
      }, 10)
    });
  });

  const getInfoRegion = () => {
    let result = [];
    for (var i in parkings)
      result.push(parkings[i].address);

    setCoordinate(result);
  };

  const interpolations = parkings.map((parking, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });
    return { scale };
  });

  async function verifyLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
      } else {
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    verifyLocationPermission();

    if (hasLocationPermission) {
      if (!map.getDataSuccess) {
        getCoordinate();
        dispatch(MapActions.mapRequest());
      }
    }
  }, [hasLocationPermission]);

  function getCoordinate() {
    Geolocation.getCurrentPosition(position => {
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }),
      error => {
        console.log(error.code, error.message)
      };
  }

  useEffect(() => {
    if (map.getDataSuccess) {
      setParkings(map.parkings);
    }
  }, [map.getDataSuccess]);

  useEffect(() => {
    getInfoRegion();
  }, [parkings])

  function onMarkerPress(mapEventData) {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  function RenderMarker() {
    return (
      parkings == [] ? null : parkings.map((parking, index) => {
        if (typeof parking.address !== "undefined") {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale
              }
            ]
          }
          let locale = { latitude: parseFloat(parking.address.latitude), longitude: parseFloat(parking.address.longitude) }
          return (
            <MapView.Marker key={index} coordinate={locale} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../../Images/marker.png')}
                  style={[styles.marker, scaleStyle]}
                >
                </Animated.Image>
              </Animated.View>
            </MapView.Marker>
          )
        }
      })
    );
  };

  function RenderMap() {

    return (
      <MapView
        style={styles.map}

        region={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034
        }}

        loadingEnabled={true}
        toolbarEnabled={true}
        zoomControlEnabled={true}
        key={GOOGLE_MAPS_APIKEY}
        ref={_map}
      >
        <MapView.Marker coordinate={userPosition}>
          <Callout tooltip onPress={() => { }}>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Meu local</Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </MapView.Marker>

        <RenderMarker />
      </MapView>
    )
  };

  function RenderScroll() {
    return (
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {parkings == [] ? null : parkings.map((parking, index) => {
          return (
            <View style={styles.card} key={index}>
              <Image
                source={require('../../Images/parking.jpg')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle} >{parking?.name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription} >{parking?.name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription} >{parking.address?.street + ', ' + parking.address?.number + ', ' + parking.address?.district}</Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileParking', { parking })}
                    style={styles.signIn}
                    activeOpacity={0.2}
                  >
                    <Text
                      style={styles.textSign}
                    >
                      Agende agora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })
        }
      </Animated.ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Buscar estacionamentos"
          placeholderTextColor="#666666"
          style={{ flex: 1, padding: 0 }}
        />
        <Icon name="ios-search" size={20} color="#59578e" />
      </View> */}

      <RenderMap />

      {/* <Search onSubmitEditing={Keyboard.dismiss} /> */}
      
      <RenderScroll />

    </View>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bubble: {
    flexDirection: "column",
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: '#59578e',
    borderWidth: 0.5,
    padding: 15,
    width: 150
  },

  name: {
    fontSize: 16,
    marginBottom: 4
  },

  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32
  },

  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
    width: '100%'
  },
  signIn: {
    width: 300,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: '#59578e',
    borderWidth: 1,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#59578e'
  },
  marker: {
    width: 40,
    height: 40,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
  },
});
