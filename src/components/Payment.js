import React, { PureComponent } from 'react';

import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';

class Payment extends PureComponent {
	render() {
		const { image, slug, title } = this.props.data;
		return (
			<div className="App-payments-item" onClick={ () => this.props.onSelect(slug) }>
				<Radio
					checked={ this.props.selected === slug }
					onChange={ () => this.props.onSelect(slug) }
					name="payment"
					className="App-payments-item-radio"
					color="default"
				/>
				{
					image ? 
						<div className="App-payments-item-logo">
							<img src={ image } alt={ title } />
						</div>
					: 
						<Typography className="App-payments-item-title" variant="headline">{ title }</Typography>
				}
				
			</div>
		);
	}
}

export default Payment;