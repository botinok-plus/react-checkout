import React, { PureComponent } from 'react';

import { connect } from 'react-redux';

import cardsy from 'cardsy';

import { closeModal, addCustomer, editCustomer } from '../store/actions';

import Button from '@material-ui/core/Button';

// modal
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

import Close from '@material-ui/icons/Close';

import AddCustomerForm from '../components/AddCustomerForm';

class AddCustomerAccount extends PureComponent {
	initialState = {
		name: '',
		address: '',
		payment: '',
		card: '',
		expiry: '',
		cvv: ''
	};

	state = this.initialState;

	componentWillReceiveProps(nextProps) {
		const { customer, openModal } = nextProps;

		if(customer) {
			this.setState(customer.data);
			this.isEdit = true;
		} else if(openModal && !customer) {
			this.setState(this.initialState);
			this.isEdit = false;
		}
	}

	formChange = (e) => {
		let { name, value } = e.target;

		if(name === 'card') {
			value = cardsy.format.number(value, ' ');
		}

		if(name === 'expiry'){
			value = cardsy.format.expiryString(value, ' / ');
		}

		if(name === 'cvv') {
			value = cardsy.format.cvc(value);
		}

		if(name === 'payment' && value !== 'credit-card') {
			this.setState({ card: '', cvv: '', expiry: '' });
		}

		this.setState({ [name]: value });
	}

	closeModal = () => {
		this.props.dispatch(closeModal());
	}

	save = () => {
		if(this.props.customer) {
			this.props.dispatch(editCustomer(this.state, this.props.customer.index));
		} else {
			this.props.dispatch(addCustomer(this.state));
		}

		this.closeModal();
	}

	render() {
		return (
			<Dialog
					open={this.props.openModal}
					onClose={this.closeModal}
					aria-labelledby="form-dialog-title"
					fullWidth={true}
					maxWidth="md"
				>
				<DialogTitle>
					{this.isEdit ? 'Edit' : 'Add'} Customer Account
					<IconButton className="dialog-close" onClick={ this.closeModal }>
						<Close />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<AddCustomerForm formData={ this.state } formChange={ this.formChange } />
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={ this.closeModal }>Cancel</Button>
					<Button color="primary" onClick={ this.save }>Save</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

const mapStateToProps = state => {
	const { openModal, editableCustomer: customer } = state.AppState;

	let newState = { openModal };
	if(customer) newState.customer = customer;

	return newState;
};

export default connect(mapStateToProps)(AddCustomerAccount);
