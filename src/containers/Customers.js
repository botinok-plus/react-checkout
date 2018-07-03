import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Customer from '../components/Customer';

import { openModal, selectCustomer, deleteCustomer } from '../store/actions';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Customers extends PureComponent {

	openModal = () => {
		this.props.dispatch(openModal());
	}

	selectCustomer = (id) => {
		this.props.dispatch(selectCustomer(id));
	}

	editCustomer = (id) => {
		const { customers } = this.props;

		let customer = customers.find(elem => elem._id === id);
		const customerIndex = customers.findIndex(elem => elem === customer);

		customer = { data: customer, index: customerIndex }

		this.props.dispatch(openModal(customer));
	}

	deleteCustomer = (id) => {
		const { customers } = this.props;
		const index = customers.findIndex(elem => elem._id === id);

		this.props.dispatch(deleteCustomer(index));
	}

	render() {
		const { customers, selected } = this.props;

		return (
			<div>
				<Typography variant="display1" gutterBottom>Customer Account</Typography>
				<div className="App-account-list">
					{customers ? customers.map((item) => <Customer 
						onSelect={ this.selectCustomer } 
						onEdit={ this.editCustomer }
						onDelete={ this.deleteCustomer }
						selected={selected === item._id} 
						key={ item._id } 
						data={ item } 
					/>) : null}
					
					<Button 
						variant="fab" 
						className="add-customer-button" 
						color="primary" 
						aria-label="add" 
						onClick={ this.openModal }
					>
						<AddIcon />
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	customers: state.Customers.items,
	selected: state.Customers.selected
});

export default connect(mapStateToProps)(Customers);