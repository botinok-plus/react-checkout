import { combineReducers } from 'redux';
import Customers from './customers';
import AppState from './appState';

export default combineReducers({
	Customers,
	AppState
});