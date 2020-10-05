import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  BackHandler
} from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Creators as ProfileParkingAction, Types as ProfileParkingTypes } from '../../store/ducks/profileParking';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 90;
const MAX_HEIGHT = 350;

export default function ProfileParking({ navigation, route }) {

  const [dataSpaces, setDataSpaces] = useState([]);
  const [renderPage, setRenderPage] = useState(false);

  const navTitleView = useRef(null);
  const dispatch = useDispatch();
  const { profileParking } = useSelector(state => state);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (typeof route.params.parking.id !== "undefined") {
      dispatch(ProfileParkingAction.profileParkingRequestSpace(route.params.parking.id));
    }
  }, [route.params.parking.id]);

  useEffect(() => {
    if (profileParking.getDataSuccess) {
      setDataSpaces(profileParking.spaces);
    }
  }, [profileParking.getDataSuccess]);

  useEffect(() => {
    if (!isFocused) {
      dispatch(ProfileParkingAction.exitScreen());
      setDataSpaces([]);
    }
  }, [isFocused]);

  const getTypeSpace = (type) => {
    switch (type) {
      case "MOTORCYCLE":
        return "Moto";
      case "CAR":
        return "Carro";
      case "BOTH":
        return "Ambos";
    }
  }

  const RenderSpaces = () => {

    return (
      dataSpaces == [] ? null : dataSpaces.map((space, index) => (
        <View key={index} style={[styles.cardSpace, styles.cardHandler]}>
          <Text style={[styles.sectionContent, styles.borderText]}>{getTypeSpace(space.type)}</Text>
          <Text style={[styles.sectionContent, styles.borderText]}>R$ {space.value}</Text>
          <Text style={[styles.sectionContent, styles.borderText]}>Vagas: {space.amount}</Text>
        </View>
      ))
    );
  };

  return (
    <SafeAreaView style={styles.container}>


      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      {!profileParking.getDataSuccess ? <View style={styles.indicator}><ActivityIndicator size='large' color='#59578e' /></View> :
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          renderHeader={() => (
            <Image source={require('../../Images/parking.jpg')} style={styles.image} />
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <Text style={styles.imageTitle}>{route.params.parking.name}</Text>
            </View>
          )}
          renderFixedForeground={() => (
            <Animatable.View style={styles.navTitleView} ref={navTitleView}>
              <Text style={styles.navTitle}>{route.params.parking.name}</Text>
            </Animatable.View>
          )}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => navTitleView.current.fadeInUp(200)}
            onDisplay={() => navTitleView.current.fadeOut(100)}
          >
            <View style={styles.overview}>
              <Text style={styles.title}>Overview</Text>
              <View style={styles.star}>
                <FontAwesome name="star" size={16} color="#59578e" style={{ marginHorizontal: 3 }} />
                <Text>5</Text>
                <Text style={{ marginHorizontal: 2 }}>(450)</Text>
              </View>
            </View>
          </TriggeringView>
          <View style={[styles.section, styles.sectionLarge]}>

            <View style={[styles.cardSpace, { backgroundColor: '#59578e' }]}>
              <View style={{ alignItems: "center" }}>
                <Text style={styles.titleSpaces}> Vagas disponíveis </Text>
              </View>
              <View style={[styles.cardSpace, styles.subCard]}>
                <Text style={[styles.sectionContent, styles.borderText]}>Tipo:</Text>
                <Text style={[styles.sectionContent, styles.borderText]}>Valor:</Text>
                <Text style={[styles.sectionContent, styles.borderText]}>Quantidade:</Text>
              </View>

              <RenderSpaces />

            </View>
          </View>
          <View style={styles.sectionLargeOffCenter}>
            <View style={styles.overview}>
              <Text style={styles.titleCharacter} > Características </Text>
            </View>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionContent} > Horários </Text>
          </View>

        </HeaderImageScrollView>
      }
    </SafeAreaView >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overview: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  star: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
    padding: 10
  },
  title: {
    fontSize: 20,
  },
  titleCharacter: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  cardSpace: {
    padding: 12,
    elevation: 2,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    shadowColor: '#59578e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  titleSpaces: {
    fontSize: 20,
    alignItems: "center",
    fontWeight: 'bold',
    color: '#fff'
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  borderText: {
    width: 100,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
    justifyContent: "center"
  },
  sectionLargeOffCenter: {
    minHeight: 200,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
  },
  indicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHandler: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    alignItems: "flex-start",
  },
  subCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "flex-start",
    backgroundColor: '#fff',
  },
});