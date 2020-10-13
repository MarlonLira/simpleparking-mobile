import React, { useEffect, useRef } from 'react';
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
  TouchableOpacity,
} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Creators as ProfileParkingAction } from '../../store/ducks/profileParking';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 90;
const MAX_HEIGHT = 350;

export default function ProfileParking({ route }) {

  const navTitleView = useRef(null);
  const dispatch = useDispatch();
  const { profileParking } = useSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isFocused) {
      dispatch(ProfileParkingAction.exitScreen());
    } else if (typeof route.params.parking.id !== "undefined") {
      dispatch(ProfileParkingAction.profileParkingRequestSpace(route.params.parking.id));
    }
  }, [isFocused, route.params.parking.id]);

  const getTypeSpace = (type) => {
    switch (type) {
      case "MOTORCYCLE":
        return "Moto";
      case "CAR":
        return "Carro";
      case "BOTH":
        return "Ambos";
    };
  };

  const handleBbtReservation = (data) => {
    navigation.navigate('Scheduling', { parking: route.params.parking, space: data });
  }

  const RenderSpaces = () => {
    return (
      <View style={styles.serviceArea}>

        <Text style={styles.serviceTitle}> Vagas diponíveis </Text>

        {profileParking.spaces == [] ? null : profileParking.spaces.map((space, index) => (
          <View key={index} style={styles.serviceItem}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{getTypeSpace(space.type)}</Text>
              <Text style={styles.servicePrice}>R$ {space.value.toFixed(2)}</Text>
              <Text style={styles.servicePrice}>Vagas: {space.amount}</Text>
            </View>
            <TouchableOpacity style={styles.serviceButton} activeOpacity={0.6} onPress={() => handleBbtReservation(space)}>
              <Text style={styles.serviceTextButton}>Agendar</Text>
            </TouchableOpacity>
          </View>
        ))}

      </View>
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

          {/* <View style={styles.sectionButton}>
            <ButtonComponent
              text="Reservar"
              onPress={() => )}
            />
          </View> */}

          <View style={[styles.section, styles.sectionLarge]}>
            <RenderSpaces />
          </View>

          <View style={styles.section}>
            <View style={styles.categories}>
              <View style={styles.categoryContainer}>
                <FontAwesome name="check-square-o" size={16} color='#fff' />
                <Text style={styles.category}>Coberto</Text>
              </View>
              <View style={styles.categoryContainer}>
                <FontAwesome name="check-square-o" size={16} color='#fff' />
                <Text style={styles.category}>Segurança</Text>
              </View>
              <View style={styles.categoryContainer}>
                <FontAwesome name="check-square-o" size={16} color='#fff' />
                <Text style={styles.category}>Monitoramento</Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, styles.sectionLargeOffCenter]}>
            <Text style={styles.sectionContent}>Avaliações</Text>
            <View style={styles.cardAppraisal}>
              <Text>Relampago Marquinhos ⭐⭐⭐⭐⭐ </Text>
              <Text>Ótimo atendimento e ótimo ambiente</Text>
            </View>
            <View style={styles.cardAppraisal}>
              <Text>Relampago Marquinhos ⭐⭐⭐⭐⭐ </Text>
              <Text>Ótimo atendimento e ótimo ambiente</Text>
            </View>
            <View style={styles.cardAppraisal}>
              <Text>Relampago Marquinhos ⭐⭐⭐⭐⭐ </Text>
              <Text>Ótimo atendimento e ótimo ambiente</Text>
            </View>
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
    color: '#59578e'
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionButton: {

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
    backgroundColor: '#59578e',
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
  },
  sectionLargeOffCenter: {
    minHeight: 300,
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
  cardAppraisal: {
    borderWidth: 1,
    borderColor: '#59578e',
    padding: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  panel: {
    backgroundColor: 'hsl(242,24%,60%)',
    paddingTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: '#fff',
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#fff',
    height: 30,
    marginBottom: 10,
  },
  dateInfo: {
    flexDirection: 'row',
  },
  datePrevArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  dateNextArea: {
    flex: 1,
    alignItems: "flex-start",
  },
  dateTitleArea: {
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  dateTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: '#000000'
  },
  modalInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dateItem: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  dateItemWeekDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateItemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {
    padding: 5,
    marginRight: 10
  },
  modalVehicle: {
    alignItems: 'center',
  },

  serviceItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  serviceInfo: {
    flex: 1
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  servicePrice: {
    fontSize: 14,
    color: '#000',
  },
  serviceButton: {
    backgroundColor: '#59578e',
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
  },
  serviceTextButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff'
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 20,
  },
  serviceArea: {
    marginTop: 20,
  }

});