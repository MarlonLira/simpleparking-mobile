import React from 'react';

import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import getApi from '../../services/getApi';
import { AlertDialog } from '../../utils/Functions';

import { Creators as ProfileActions, Types as ProfileTypes } from '../ducks/profile';
import { Creators as CreditCardActions, Types as CreditCardTypes } from '../ducks/creditCard';
import { Creators as CarActions, Types as CarTypes } from '../ducks/car';
import { Creators as MapActions, Types as MapATypes } from '../ducks/map';
import { Creators as ProfileParkingAction, Types as ProfileParkingTypes } from '../ducks/profileParking';
import { Creators as SchedulingAction, Types as SchedulingTypes } from '../ducks/scheduling';

export default function* rootSaga() {
  return yield all([
    takeLatest(ProfileTypes.EDIT.REQUEST, editUser),
    takeLatest(ProfileTypes.USER.REQUEST, getDataUser),

    takeLatest(CreditCardTypes.CREDIT_CARD_INCLUDE, includeCreditCard),
    takeLatest(CreditCardTypes.CREDIT_CARD_REQUEST, getCreditCards),
    takeLatest(CreditCardTypes.CREDIT_CARD_DELETE, deleteCreditCard),
    takeLatest(CreditCardTypes.CREDIT_CARD_EDIT_ITEM, editCreditCard),

    takeLatest(CarTypes.CAR_INCLUDE, includeCar),
    takeLatest(CarTypes.CAR_REQUEST, getCars),
    takeLatest(CarTypes.CAR_DELETE, deleteCar),
    takeLatest(CarTypes.CAR_EDIT_ITEM, editCar),

    takeLatest(MapATypes.MAP_REQUEST, getParkings),

    takeLatest(ProfileParkingTypes.PROFILE_PARKING_REQUEST_SPACE, getParkingspace),
    takeLatest(ProfileParkingTypes.PROFILE_PARKING_REQUEST, getProfile),

    takeLatest(SchedulingTypes.SCHEDULING_INCLUDE, includeScheduling),
    takeLatest(SchedulingTypes.SCHEDULING_REQUEST, getScheduling),
    takeLatest(SchedulingTypes.SCHEDULING_EDIT, editScheduling),
  ]);
};

/**
 * User
 */
function* editUser(action) {
  try {


    const { values } = action.payload;
    const response = yield call(getApi.put, `/user/`, values);
    yield put(ProfileActions.editSuccess());
    yield put(ProfileActions.offEdit());
    yield put(ProfileActions.getUserRequest(values.id));

    AlertDialog('Sucesso', 'Alteração realizada!', ['OK']);

  } catch (error) {
    yield put(ProfileActions.editFailure());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* getDataUser(action) {
  try {

    const id = action.payload;
    const respone = yield call(getApi.get, `/user/${id}`);
    yield put(ProfileActions.dataUser(respone.data.result));

  } catch (error) {
    console.log(error);
  };
};

/**
 * Credit Card 
 */

function* includeCreditCard(action) {
  try {

    const { values } = action.payload;
    const respone = yield call(getApi.post, `/card/`, values);
    yield put(CreditCardActions.creditCardSuccessInclude());

    const { profile } = yield select();
    yield put(CreditCardActions.creditCardRequest(profile.dataUser.id));

    AlertDialog('Sucesso', 'Novo cartão cadastrado', ['OK']);

  } catch (error) {
    yield put(CreditCardActions.creditCardErrorInclude());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* getCreditCards(action) {
  try {

    const id = action.payload;
    const response = yield call(getApi.get, `/cards/userId/${id}`);
    yield put(CreditCardActions.creditCardData(response.data.result));

  } catch (error) {

    AlertDialog('Erro', error.response.data.message, ['OK']);

  }
};

function* deleteCreditCard(action) {
  try {

    const id = action.payload;
    const response = yield call(getApi.delete, `/card/${id}`,);
    yield put(CreditCardActions.creditCardDeleteSuccess());

    const { profile } = yield select();
    yield put(CreditCardActions.creditCardRequest(profile.dataUser.id));

    AlertDialog('Sucesso', 'Cartão excluído!', ['OK']);

  } catch (error) {

    yield put(CreditCardActions.creditCardDeleteError());
    AlertDialog('Erro', error.response.data.message, ['OK']);

  };
};

function* editCreditCard(action) {
  try {

    const values = action.payload;
    const respone = yield call(getApi.put, `/card/`, values.card);
    yield put(CreditCardActions.creditCardEditItemSuccess());

    const { profile } = yield select();
    yield put(CreditCardActions.creditCardRequest(profile.dataUser.id));

    AlertDialog('Sucesso', 'Dados alterados!', ['OK']);

  } catch (error) {
    yield put(CreditCardActions.creditCardEditItemError())
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

/**
 * Car
 */
function* includeCar(action) {
  try {

    const { values } = action.payload;
    const { profile } = yield select();

    const respone = yield call(getApi.post, '/vehicle/', values);

    yield put(CarActions.carRequest(profile.dataUser.id));
    yield put(CarActions.carSuccessInclude());

    AlertDialog('Sucesso', 'Novo veículo cadastrado!', ['OK']);

  } catch (error) {
    yield put(CarActions.carErrorInclude());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* getCars(action) {
  try {

    const id = action.payload;
    const response = yield call(getApi.get, `/vehicles/userId/${id}`);
    yield put(CarActions.carData(response.data.result));

  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* deleteCar(action) {
  try {

    const id = action.payload;
    const { profile } = yield select();

    const response = yield call(getApi.delete, `/vehicles/${id}`);
    yield put(CarActions.carDeleteSuccess());
    yield put(CarActions.carRequest(profile.dataUser.id));

    AlertDialog('Sucesso', 'Veículo excluído!', ['OK']);

  } catch (error) {
    yield put(CarActions.carDeleteError());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* editCar(action) {

  try {

    const { profile } = yield select();
    const { values } = action.payload;

    const request = yield call(getApi.put, '/vehicle/', values);

    yield put(CarActions.carEdiItemSuccess());
    yield put(CarActions.carRequest(profile.dataUser.id));

    AlertDialog('Sucesso', 'Alteração ralizada', ['OK']);

  } catch (error) {
    yield put(CarActions.carEditItemError());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  }

}

/**
 * Map - Parkings
 */
function* getParkings(action) {
  try {
    const response = yield call(getApi.get, `/parkings/`);
    yield put(MapActions.mapData(response.data.result));
  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
  }
}

/**
 * Profile parking - Parking space
 */
function* getParkingspace(action) {
  try {

    const id = action.payload;
    const response = yield call(getApi.get, `/Parkingspace/parkingId/${id}`);
    yield put(ProfileParkingAction.spaceData(response.data.result));

  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
};

function* getProfile(action) {
  try {
    const id = action.payload;
    const response = yield call(getApi.get, `parking/${id}`);
    yield put(ProfileParkingAction.profileData(response.data.result));
  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
  };
}

/**
 * Scheduling 
 */
function* includeScheduling(action) {
  try {
    const { values } = action.payload;
    const respone = yield call(getApi.post, '/scheduling/', values);

    yield put(SchedulingAction.schedulingSuccessInclude());

    AlertDialog('Sucesso', 'Agendamento realizado!', ['OK']);
  } catch (error) {
    yield put(SchedulingAction.schedulingInclude());
    AlertDialog('Erro', error.response.data.message, ['OK']);
  }
};

function* getScheduling(action) {
  try {

    const idUser = action.payload;
    const respone = yield call(getApi.get, `/schedulings/userId/${idUser}`);
    yield put(SchedulingAction.schedulingData(respone.data.result));

  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
  }
}

function* editScheduling(action) {
  try {

    const { values } = action.payload;
    const response = yield call(getApi.put, '/scheduling/', values);
    yield put(SchedulingAction.schedulingSuccessEdit());

  } catch (error) {
    AlertDialog('Erro', error.response.data.message, ['OK']);
    yield put(SchedulingAction.schedulingErrorEdit());
  }
}