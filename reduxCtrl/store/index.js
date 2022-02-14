// main Store for react-redux

import {createStore} from "redux";

import rootReducer from '../reducers';

const store = createStore(rootReducer);

export default store;

