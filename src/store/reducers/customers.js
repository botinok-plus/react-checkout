import dotProp from 'dot-prop-immutable';

import { ADD_CUSTOMER, EDIT_CUSTOMER, DELETE_CUSTOMER, SELECT_CUSTOMER } from '../actions';

const initialState = {
	selected: null,
	items: [
		{
			_id: 32321313,
			name: 'Robin Bobin',
			address: 'Bobina 42a',
			payment: 'paypal',
			card: '',
			cvv: '',
			expiry: ''
		},
		{
			_id: 3244234242,
			name: 'Bobin Robin',
			address: 'Robina 23b',
			payment: 'credit-card',
			card: '4149 0000 3232 1243',
			cvv: '123',
			expiry: '02 / 20'
		}
	]
}

export default ( state = initialState, action ) => {

	switch (action.type) {
		case ADD_CUSTOMER:
			action.customer._id = Date.now();
			return { ...state, items: [ ...state.items, action.customer ] };

		case EDIT_CUSTOMER:
			return dotProp.set(state, `items.${action.index}`, action.customer);

		case DELETE_CUSTOMER:
			const deleted = dotProp.delete(state, `items.${action.index}`);
			
			return state.selected === state.items[action.index]._id ? dotProp.set(deleted, `selected`, null) : deleted;
		
		case SELECT_CUSTOMER:
			return { ...state, selected: action.id };
		
		default:
			return state

	}

};