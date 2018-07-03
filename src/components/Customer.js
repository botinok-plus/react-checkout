import React, { PureComponent } from "react";

import Radio from '@material-ui/core/Radio';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import payments from '../store/payments.json';

class Customer extends PureComponent {

	state = {
		anchorEl: null,
	};

	openDropMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	closeDropMenu = () => {
		this.setState({ anchorEl: null });
	};


	edit = () => {
		this.props.onEdit(this.props.data._id);
		this.closeDropMenu();
	}

	delete = () => {
		this.props.onDelete(this.props.data._id);
		this.closeDropMenu();
	}

	render() {
		let { name, payment, _id: id } = this.props.data;

		payment = payments.find((item) => item.slug === payment);
		
		return (
			<div className="App-account-list-item">
				<Radio
					checked={ this.props.selected }
					onChange={ () => this.props.onSelect(id) }
					name="customer"
					className="App-account-list-item-radio"
					color="default"
				/>
				<div className="App-account-list-item-content">
					<CardHeader
						avatar={ <Avatar>$</Avatar> }
						action={
							<div>
								<IconButton
									aria-label="More"
									aria-owns={this.state.anchorEl ? 'drop-menu' : null}
									aria-haspopup="true"
									onClick={this.openDropMenu}
								>
									<MoreVertIcon />
								</IconButton>
								<Menu
									id="drop-menu"
									anchorEl={ this.state.anchorEl }
									open={ Boolean(this.state.anchorEl) }
									onClose={this.closeDropMenu}
								>
									<MenuItem onClick={ this.edit }>
										<Edit style={ {marginRight: 10} } /> Edit
									</MenuItem>
									<MenuItem onClick={ this.delete }>
										<Close style={ { marginRight: 10 } } /> Delete
									</MenuItem>
								</Menu>
							</div>
						}
						title={ name }
						subheader={ payment.title }
						style={ {padding: 0, marginBottom: 10} }
					/>
					<Typography variant="subheading">Account No.: { id }</Typography>
					<Typography variant="subheading">Issuing bank: { payment.altName ? payment.altName : payment.title }</Typography>
				</div>
			</div>
		);
	}
}

export default Customer;