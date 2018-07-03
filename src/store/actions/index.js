// Action types
export const CHANGE_STEP = 'CHANGE_STEP';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const SELECT_CUSTOMER = 'SELECT_CUSTOMER';
export const SELECT_PAYMENT = 'SELECT_PAYMENT';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

// Action creators
export const changeStep = step => ({ type: CHANGE_STEP, step });
export const addCustomer = customer => ({ type: ADD_CUSTOMER, customer });
export const editCustomer = (customer, index) => ({ type: EDIT_CUSTOMER, customer, index });
export const deleteCustomer = index => ({ type: DELETE_CUSTOMER, index });
export const selectCustomer = id => ({ type: SELECT_CUSTOMER, id });
export const selectPayment = slug => ({ type: SELECT_PAYMENT, slug });
export const openModal = customer => ({ type: OPEN_MODAL, payload: true, customer });
export const closeModal = () => ({ type: CLOSE_MODAL, payload: false });