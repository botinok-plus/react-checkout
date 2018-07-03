import React, { PureComponent } from 'react';

class CartListItem extends PureComponent {
	render() {
		const { image, firstText, secondText, thirdText } = this.props;
		
		return (
			<div className="cart-list-item">
				{ image && <figure className="cart-list-image">
					<img src={image} alt={firstText} />
				</figure> }
				{ (firstText || secondText || thirdText) &&
					<div className="cart-list-text">
						{ firstText && <div className="title">{firstText}</div> }
						{ secondText && <div className="brand">{secondText}</div> }
						{ thirdText && <div className="price">{thirdText}</div> }
					</div>
				}
			</div>
		)
	}
}

export default CartListItem;