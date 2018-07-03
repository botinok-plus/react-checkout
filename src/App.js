import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

//import { changeStep } from './store/actions';
import cartItems from './store/cart-data.json';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import { changeStep } from './store/actions';

//import Icon from '@material-ui/core/Icon';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import CartList from './components/CartList';
import CartListItem from './components/CartListItem';
import AddCustomerAccount from './containers/AddCustomerAccount';
import Customers from './containers/Customers';
import PaymentSelection from './containers/PaymentSelection';

import payments from './store/payments.json'

import './styles.css';

class App extends PureComponent {

	changeStep = step => {
		this.props.dispatch(changeStep(step));
	}

	render() {
		const { step, selectedCustomer, selectedPayment } = this.props;
		let vat = 0;
		let total = 0, subtotal = 0, commision = 0;

		cartItems.map(cartItem => subtotal = subtotal + Number(cartItem.price));

		if(selectedPayment) {
			let paymentType = payments.find(item => item.slug === selectedPayment);

			commision = subtotal * Number(paymentType.commision);

			switch (selectedPayment) {
				case 'paypal':
					vat = 84.4;
					total = subtotal + commision + vat;

					break;

				case 'credit-card':
					total = subtotal + commision;

					break;

				default:
					total = subtotal;

					break;
			}
		} else {
			total = subtotal;
		}

		return (
			<div>
				<AddCustomerAccount />
				<Grid className="App" container>
					<Grid item xs={9} className="App-content">
						<div className="App-steps">
							<Tabs value={ step !== 'payment-selection' ? 0 : 1} className="App-tabs">
								<Tab
									disableRipple
									label="01 CUSTOMER ACCOUNT"
									onClick={ () => this.changeStep('account') }
								/>
								<Tab
									disableRipple
									label="02 PAYMENT SELECTION"
									disabled={ selectedCustomer ? false : true }
									onClick={ () => this.changeStep('payment-selection') }
								/>
							</Tabs>
						</div>
						<div className="App-content-inner">
							{ step === 'account' && <Customers /> }
							{ step === 'payment-selection' && <PaymentSelection selected={ selectedPayment } /> }
						</div>

						<Grid container justify="space-between">
							<Grid item>
								<Button 
									variant="text"
									disableRipple={ step !== 'payment-selection' ? true : false }
									disabled={ step !== 'payment-selection' ? true : false }
									onClick={ () => this.changeStep('account') }
								>
									<KeyboardBackspace /> Return to { step !== 'payment-selection' ? 'Shop' : 'Customer Account' }
								</Button>
							</Grid>
							{ selectedCustomer &&
								<Grid item>
									<Button variant="contained" onClick={ step === 'account' ? () => this.changeStep('payment-selection') : () => alert('Thanks for your order! Your order total is $ ' + total + '.') } size="large" color="primary">
										{ step === 'account' ? 'CONTINUE TO PAYMENT' : 'Complete order' }
									</Button>
								</Grid>
							}
						</Grid>
					</Grid>
					<Grid item xs={3} className="App-cart">
						<Grid className="App-cart-heading" container justify="space-between">
							<Grid item>
								<Typography variant="headline" gutterBottom>Shopping Cart</Typography>
							</Grid>
							<Grid item>
								<Badge badgeContent={cartItems.length} className="App-cart-count" color="primary"> </Badge>
							</Grid>
						</Grid>
						<Divider />
						<div className="App-cart-inner">
							<CartList>
								{ cartItems.map((item, index) => <CartListItem key={index} image={item.image} firstText={item.title} secondText={item.vendor} thirdText={item.price} />) }
							</CartList>
						</div>
						<Divider />
						<Grid className="App-cart-footer">
							<Grid className="App-cart-subtotal" container justify="space-between">
								<Grid item>Subtotal</Grid>
								<Grid className="count" item>{ subtotal }</Grid>
							</Grid>
							{ commision !== 0 &&
								<Grid className="App-cart-subtotal" container justify="space-between">
									<Grid item>Payment processing services 1%</Grid>
									<Grid className="count" item>{ commision }</Grid>
								</Grid>
							}
							{ !!vat &&
								<Grid className="App-cart-subtotal" container justify="space-between">
									<Grid item>VAT</Grid>
									<Grid className="count" item>{ vat }</Grid>
								</Grid>
							}
							<Divider className="total-line" />
							<Grid className="App-cart-total" container justify="space-between">
								<Grid item>Total</Grid>
								<Grid className="count" item>{ total }</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	step: state.AppState.step,
	selectedCustomer: state.Customers.selected,
	selectedPayment: state.AppState.payment ? state.AppState.payment : state.Customers.selected ? state.Customers.items.find((item) => item._id === state.Customers.selected).payment : null
});


export default connect(mapStateToProps)(App);