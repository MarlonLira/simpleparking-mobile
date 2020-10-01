import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';;
import Geolocation from 'react-native-geolocation-service'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { Creators as MapActions } from '../../store/ducks/map';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBrGTfBFa0mZ9303uZOuvW-xYxHXtHRs2k';
const backgroundColor = '#007256';
const { height, width } = Dimensions.get('window');

export default function Main() {

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState({ latitude: -8.028396, longitude: -34.907355 });
  const [renderMapState, setRenderMapState] = useState(true);

  const dispatch = useDispatch();
  const { map } = useSelector(state => state);

  const navigation = useNavigation();

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
    dispatch(MapActions.mapRequest());
  }, []);

  useEffect(() => {
    verifyLocationPermission();

    if (hasLocationPermission) {
      getCoordinate();
    }
  }, [hasLocationPermission]);

  function getCoordinate() {
    Geolocation.getCurrentPosition(position => {
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      setRenderMapState(true);

    }),
      error => {
        console.log(error.code, error.message)
      };
  }

  function RenderMarker() {
    let parkings = [{coordinate: { latitude: -8.028962, longitude: -34.907334, }, name: 'Seu z'},
    {coordinate: { latitude: -8.029470, longitude: -34.907348 }, name: 'Seu A'},
    {coordinate: { latitude: -8.028771, longitude: -34.907174 }, name: 'Seu B'},]
    return (
      parkings.map(parking => {
        return (
          <MapView.Marker key={parking.coordinate.latitude} coordinate={parking.coordinate}>
            <Callout tooltip onPress={() => { }}>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}>{parking.name}</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </MapView.Marker>
        )
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

  return (
    <View style={styles.container}>
      {renderMapState ?
        <RenderMap />
        : null
      }
    </View>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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

});
