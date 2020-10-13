import React, { useState, useEffect, useRef, useContext } from 'react';
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
  ScrollView,
} from 'react-native'
import ButtonComponent from '../../components/Button';
import InputTextComponent from '../../components/TextInput';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Dialog from "react-native-dialog";
import { Picker } from '@react-native-community/picker';
import { DecryptValue } from '../../utils/crypto';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { Creators as CarAction } from '../../store/ducks/car';
import { Creators as CrediCardAction } from '../../store/ducks/creditCard';
import { Creators as SchedulingActions } from '../../store/ducks/scheduling';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 90;
const MAX_HEIGHT = 350;

export default function Scheduling({ route }) {

  const { user } = useContext(AuthContext);

  const navTitleView = useRef(null);
  const dispatch = useDispatch();
  const { profileParking, car, creditCard, } = useSelector(state => state);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedHourStart, setSelectedHourStart] = useState(null);
  const [selectedHourFinal, setSelectedHourFinal] = useState(null);
  const [listHours, setListHours] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [cCard, setCCard] = useState([]);
  const [spacesSchedule, setSpcacesSchedule] = useState({});
  const [vehicleSchedule, setVehicleSchedule] = useState(null);
  const [cCardSchedule, setCCardSchedule] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visibleStartTime, setVisibleStartTime] = useState(false);
  const [visibleFinalTime, setVisibleFinalTime] = useState(false);
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourFinal, setHourFinal] = useState('');
  const [space, setSpace] = useState('');
  const [parking, setParking] = useState({});

  LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Quar.', 'Qui.', 'Sex.', 'Sab.'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr'

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const showDialogStartTime = () => setVisibleStartTime(true);

  const hideDialogStartTime = () => setVisibleStartTime(false);

  const showDialogFinalTime = () => setVisibleFinalTime(true);

  const hideDialogFinalTime = () => setVisibleFinalTime(false);

  useEffect(() => {
    dispatch(CarAction.carRequest(user.id));
    dispatch(CrediCardAction.creditCardRequest(user.id));
  }, []);

  useEffect(() => {
    const { space } = route.params;
    setSpace(`${getTypeSpace(space.type)} | ${space.value.toFixed(2)}`)
    setSpcacesSchedule(route.params.space);
  }, [route.params.space])

  useEffect(() => {
    const { parking } = route.params;
    setParking(parking);
  }, [route.params.parking])

  const hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];

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

  const handleDate = (date) => {
    hideDialog();
    setDate(`${date.day}/${date.month}/${date.year}`);
    setSelectedDate(`${date.year}-${date.month}-${date.day}`);
  }

  const handleHourStart = (item) => {
    hideDialogStartTime();
    setHourStart(item);
    setSelectedHourStart(`${item}:00`);
  };

  const handleHourFinal = (item) => {
    hideDialogFinalTime();
    setHourFinal(item);
    setSelectedHourFinal(`${item}:00`);
  };

  const handleButton = () => {
    const data = {
      scheduling: {
        date: selectedDate,
        avaliableTime: selectedHourStart,
        unavailableTime: selectedHourFinal,
        value: spacesSchedule.value,
        vehicleType: vehicleSchedule.type,
        userId: user.id,
        vehicleId: vehicleSchedule.id,
        parkingId: parking.id,
        parkingSpaceId: 92,
        cardId: cCardSchedule.id,
        companyId: parking.companyId,
      }
    }
    dispatch(SchedulingActions.schedulingInclude(data));
  }

  const RenderCalendar = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Dialog.Container visible={visible} >
          <Dialog.Title>Selecione a data para o agendamento!</Dialog.Title>

          <Calendar
            onDayPress={(response) => handleDate(response)}
          />

          <TouchableOpacity style={styles.cancel} activeOpacity={0.5} onPress={hideDialog}>
            <Text style={styles.textSign}>Cancelar</Text>
          </TouchableOpacity>

        </Dialog.Container>
      </View>
    )
  }

  const RenderStartTime = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Dialog.Container visible={visibleStartTime} >
          <Dialog.Title>Selecione a hora para o agendamento!</Dialog.Title>

          <ScrollView style={styles.scroll}>
            {hours.map((item, index) => (

              <TouchableOpacity
                key={index}
                style={[styles.dateItem, { margin: 10 }]}
                onPress={() => handleHourStart(item)}
              >
                <Text style={styles.dateItemNumber}>{item}</Text>
              </TouchableOpacity>
            )
            )}
          </ScrollView>

          <TouchableOpacity style={styles.cancel} activeOpacity={0.5} onPress={hideDialogStartTime}>
            <Text style={styles.textSign}>Cancelar</Text>
          </TouchableOpacity>

        </Dialog.Container>
      </View>
    )
  }

  const RenderFinalTime = () => {
    return (
      <View>
        <Dialog.Container visible={visibleFinalTime} >
          <Dialog.Title>Selecione a hora para o agendamento!</Dialog.Title>

          <ScrollView style={styles.scroll}>
            {hours.map((item, index) => (

              <TouchableOpacity
                key={index}
                style={[styles.dateItem, { margin: 10, width: '100%' }]}
                onPress={() => handleHourFinal(item)}
              >
                <Text style={styles.dateItemNumber}>{item}</Text>
              </TouchableOpacity>
            )
            )}
          </ScrollView>

          <TouchableOpacity style={styles.cancel} activeOpacity={0.5} onPress={hideDialogFinalTime}>
            <Text style={styles.textSign}>Cancelar</Text>
          </TouchableOpacity>

        </Dialog.Container>
      </View>
    )
  }

  const RenderPikerVehicle = () => {

    setVehicle(car.cars);

    var allTypes = vehicle.map((item, index) => {
      return <Picker.Item key={index} value={item} label={`${item.model} | ${item.licensePlate}`} />
    });

    return (
      <Picker
        selectedValue={vehicleSchedule}
        onValueChange={(itemValue, itemIndex) => setVehicleSchedule(itemValue)}
        mode='dropdown'
        style={{ marginLeft: 10, color: '#000' }}
      >
        <Picker.Item key={''} value={''} label={''} />
        {allTypes}
      </Picker>
    )
  };

  const RenderPikerCard = () => {
    setCCard(creditCard.creditCards);

    var allTypes = cCard.map((item, index) => {
      var nummber = DecryptValue(item.number).substring(12, 16)
      return <Picker.Item key={index} value={item} label={`${item.flag.toUpperCase()} | ****${nummber}`} />
    });

    return (
      <Picker
        selectedValue={cCardSchedule}
        onValueChange={(itemValue, itemIndex) => setCCardSchedule(itemValue)}
        mode='dropdown'
        style={{ marginLeft: 10, color: '#000' }}
      >
        <Picker.Item key={''} value={''} label={''} />
        {allTypes}
      </Picker>
    )
  };

  const RenderInner = () => {

    return (
      <View style={styles.panel}>

        <InputTextComponent
          value={space}
          placeholder='Tipo da vaga'
          icon={"grid"}
          label={'Vaga'}
          editable={false}
        />

        <TouchableOpacity onPress={showDialog} activeOpacity={0.8}>
          <InputTextComponent
            value={date}
            placeholder='Data do agendamento'
            icon={"calendar"}
            label={'Data'}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDialogStartTime} activeOpacity={0.8}>
          <InputTextComponent
            value={hourStart}
            placeholder='Horário para chegada'
            icon={"clock"}
            label={'Hora inicial'}
            editable={false}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={showDialogFinalTime} activeOpacity={0.8}>
          <InputTextComponent
            value={hourFinal}
            placeholder='Horário para saída'
            icon={"calendar"}
            label={'Hora final'}
            editable={false}
          />
        </TouchableOpacity>

        <View style={styles.modalVehicle}>
          <View style={[styles.modalInfo, { width: '100%' }]}>
            <View style={styles.modalVehicle}>
              <Text > Selecione o veículo que irá estacionar </Text>
            </View>
            <RenderPikerVehicle />
          </View>
        </View>

        <View style={styles.modalVehicle}>
          <View style={[styles.modalInfo, { width: '100%' }]}>
            <View style={styles.modalVehicle}>
              <Text > Selecione o cartão para pagamento </Text>
            </View>
            <RenderPikerCard />
          </View>
        </View>

        <View style={{ marginTop: 10, marginBottom: 30 }}>
          <ButtonComponent text="Finalizar agendamento" onPress={handleButton}/>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>


      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      {/* {!profileParking.getDataSuccess ? <View style={styles.indicator}><ActivityIndicator size='large' color='#59578e' /></View> : */}
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
            <Text style={styles.imageTitle}></Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>Agendamento</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View style={styles.overview}>
            <Text style={styles.panelTitle}> Agendamento </Text>
            <Text style={styles.panelSubtitle}> Selecione os dados conforme desejar </Text>
          </View>

        </TriggeringView>

        <View>
          <RenderInner />
        </View>

        <RenderCalendar />
        <RenderStartTime />
        <RenderFinalTime />

      </HeaderImageScrollView>
      {/* } */}

    </SafeAreaView >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancel: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#59578e',
    borderWidth: 1,
    marginTop: 15
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#59578e'
  },
  overview: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    padding: 10,
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
    padding: 20,
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
    paddingTop: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    color: '#000',
  },
  panelSubtitle: {
    fontSize: 14,
    color: '#000',
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
  },
  modalVehicle: {
    alignItems: 'center',
  },
});