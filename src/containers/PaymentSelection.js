import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectPayment } from '../store/actions';

import Payment from '../components/Payment';
import Typography from '@material-ui/core/Typography';

import payments from '../store/payments.json';


class PaymentSelection extends PureComponent {

	selectPayment = (payment) => {
		this.props.dispatch(selectPayment(payment));
	}

	render() {
		const { selected } = this.props;

		return (
			<div>
				<Typography variant="display1" gutterBottom>Payment Selection</Typography>
				<div className="App-payments">
					{ payments.map((payment, index) => <Payment selected={ selected } key={ index } data={ payment } onSelect={ this.selectPayment } />) }
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({});
 
export default connect(mapStateToProps)(PaymentSelection);