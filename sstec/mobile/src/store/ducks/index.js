import { combineReducers } from 'redux';

import profile from './profile';
import scheduling  from './scheduling';
import creditCard from './creditCard';
import car from './car';
import map from './map';
import profileParking from './profileParking'

export default combineReducers({
  profile,
  scheduling,
  creditCard,
  car,
  map,
  profileParking,
});