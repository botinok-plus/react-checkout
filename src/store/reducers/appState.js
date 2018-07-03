import { 
	CHANGE_STEP,
	OPEN_MODAL,
	CLOSE_MODAL,
	SELECT_PAYMENT
 } from '../actions';

export default ( state = { step: 'account', openModal: false, payment: null }, action ) => {

	switch (action.type) {
		case CHANGE_STEP:
			return { ...state, step: action.step };

		case OPEN_MODAL:
			return action.customer ? 
				{ ...state, openModal: action.payload, editableCustomer: action.customer } :
				{ ...state, openModal: action.payload };

		case CLOSE_MODAL:
			state.editableCustomer && delete state.editableCustomer;
			return { ...state, openModal: action.payload };

		case SELECT_PAYMENT:
			return { ...state, payment: action.slug}

		default:
			return state;
	}
};