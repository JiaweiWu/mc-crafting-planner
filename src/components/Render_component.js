import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Row, Col, Grid } from 'react-bootstrap';

import CraftingTable from './Crafting_table';

const componentTarget = {
	drop(props, monitor, component) {

		if (monitor.didDrop()) {
			return;
		}
		return {
			target: "table"
		};
	}
}

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
	};
}

class RenderComponent extends Component {
	constructor(props) {
		super(props);
	}

	changeBackground(color) {
		background = color;
	}

	render() {
		const { connectDropTarget, isOver, component } = this.props;

		return connectDropTarget(
			<div>
				<div style={{
					height: "100px"	
				}}>
					{!component ? "Drag an Component" : component.name}
				</div>
				<CraftingTable />
			</div>
		);
	}
}

RenderComponent.propTypes = {
	isOver: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
	return {
		component: state.component.selectedComponent
	};
}

RenderComponent = DropTarget("SINGLE_COMPONENT", componentTarget, collect)(RenderComponent);
export default connect(mapStateToProps, null)(RenderComponent);