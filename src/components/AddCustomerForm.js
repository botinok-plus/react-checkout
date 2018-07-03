import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogContentText from '@material-ui/core/DialogContentText';

import payments from '../store/payments.json';

class AddCustomerForm extends PureComponent {
	handleChange = (e) => {
		this.props.formChange(e);
	}

	render() {
		const { name, address, payment, card, cvv, expiry } = this.props.formData;

		return (
			<form noValidate autoComplete="off">
				<DialogContentText className="form-line">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</DialogContentText>
				
				<Grid className="form-line" item xs={6}>
					<TextField
						id="name"
						label="Name *"
						name="name"
						value={name}
						onChange={this.handleChange}
						fullWidth={true}
					/>
				</Grid>

				<Grid className="form-line" item xs={6}>
					<TextField
						id="Address"
						name="address"
						label="Address *"
						value={address}
						onChange={this.handleChange}
						fullWidth={true}
					/>
				</Grid>

				<Grid className="form-line" item xs={6}>
					<FormControl style={{ width: '100%', }}>
						<InputLabel htmlFor="payment-method">Payment method *</InputLabel>
						<Select
							value={payment}
							name="payment"
							onChange={this.handleChange}
							inputProps={{
								name: 'payment',
								id: 'payment-method',
							}}
						>
							{ payments.map((payment, index) => <MenuItem key={ index } value={ payment.slug }>{ payment.title }</MenuItem>) }
						</Select>
					</FormControl>
				</Grid>

				<DialogContentText style={{margin: '25px 0'}}>Safe money transfer using your bank account. Visa, Maestro, Discover, American Express.</DialogContentText>
				
				{ payment === 'credit-card' && 
					<Grid container spacing={32}>
						<Grid item xs={6}>
							<TextField
								id="card-number"
								name="card"
								label="Card number *"
								value={card}
								onChange={this.handleChange}
								fullWidth={true}
								placeholder="0000 0000 0000 0000"
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								id="expiry-date"
								name="expiry"
								label="Expiry date *"
								value={expiry}
								onChange={this.handleChange}
								fullWidth={true}
								placeholder="MM / YY"
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								id="cvv-code"
								type="password"
								name="cvv"
								label="CVV code *"
								value={cvv}
								onChange={this.handleChange}
								fullWidth={true}
								placeholder="000"
							/>
						</Grid>
					</Grid>
				}
			</form>
		)
	}
}

export default AddCustomerForm;