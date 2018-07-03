import React, { PureComponent } from 'react';

class CartList extends PureComponent {
	render() {
		return (
			<div className="cart-list">
				{this.props.children}
			</div>
		)
	}
}

export default CartList;