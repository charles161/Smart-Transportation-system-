import { combineReducers } from 'redux';
import reducer from './mqtt_reducer';
import {BALANCE,CREDITS,LASTTX,INFO} from '../action/types'
const getBalance = reducer({ response: null}, BALANCE);
const getLastTx= reducer({ response: []}, LASTTX);
const getCredits = reducer({ response: null}, CREDITS);
const getInfo = reducer({ response: null }, INFO);

export default combineReducers({
  getBalance,
getLastTx,
getCredits,
getInfo
});
