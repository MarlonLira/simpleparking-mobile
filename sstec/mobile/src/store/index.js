import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks';
import rootSaga from './sagas';

const middlewares = [];

const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware); 

const composer = compose(applyMiddleware(...middlewares));

const store = createStore(rootReducer, composer);

sagaMiddleware.run(rootSaga);

export default store;