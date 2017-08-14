import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { Row, Col, Button } from 'react-bootstrap';
import { updateComponentChild } from '../actions/index';

const gridTarget = {
	drop(props, monitor, component) {
		return {
			target: "grid",
			index: props.index
		};
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

class CraftingTableGrid extends Component {
	constructor(props) {
		super(props);
	}

	removeComponentChild(event) {
		if (!this.props.componentName) {
			console.log("Nothing to Remove");
			return
		}
		this.props.updateComponentChild(null, this.props.index);
		console.log("Removed");
	}

	render() {
		const { connectDropTarget, isOver, componentName, index} = this.props;
		let background = isOver ? "blue" : "white";

		return connectDropTarget(
			<div className="text-center">
				<div style={{
					paddingBottom: "100%",
					background,
					borderStyle: "solid"
				}}>
				</div>

				<div style={{
					position: "absolute",
					top: "50%",
    				left: "50%",
    				transform: "translate(-50%, -50%)"
				}}>
					<h3 style={{
						margin: "0"
					}}>
						{componentName ? componentName : ""}
					</h3>
					<Button
						onClick={this.removeComponentChild.bind(this)}>
						Remove
					</Button>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ updateComponentChild }, dispatch);
}

CraftingTableGrid = connect(null, mapDispatchToProps)(CraftingTableGrid);
export default DropTarget("SINGLE_COMPONENT", gridTarget, collect)(CraftingTableGrid);